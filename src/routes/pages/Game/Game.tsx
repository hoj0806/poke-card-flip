import { Link, useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { useState, useEffect } from "react";
import Card from "../../../components/Game/Card";
import ProgressBarTimer from "../../../components/Game/ProgressBarTimer";
import { motion, AnimatePresence } from "framer-motion";

interface PokemonCard {
  id: string;
  name: string;
  image: string;
  isFlied: boolean;
  isCorrect: boolean;
}

export default function Game() {
  const { difficulty } = useParams();
  const pokemons = usePokemonStore((state) => state.pokemons);

  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>(() => {
    if (!pokemons || pokemons.length === 0) return [];

    let cardCount = 6;
    if (difficulty === "normal") cardCount = 10;
    else if (difficulty === "hard") cardCount = 15;

    const selectedPokemons = [...pokemons]
      .sort(() => Math.random() - 0.5)
      .slice(0, cardCount);

    return selectedPokemons
      .flatMap((p) => [
        {
          id: `${p.id}-1`,
          name: p.name,
          image: p.image,
          isFlied: true,
          isCorrect: false,
        },
        {
          id: `${p.id}-2`,
          name: p.name,
          image: p.image,
          isFlied: true,
          isCorrect: false,
        },
      ])
      .sort(() => Math.random() - 0.5);
  });

  const [flippedCards, setFlippedCards] = useState<PokemonCard[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleFlip = (card: PokemonCard) => {
    if (isGameOver || flippedCards.length >= 2) return;
    if (!card.isFlied || card.isCorrect) return;

    setPokemonCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlied: false } : c))
    );
    setFlippedCards((prev) => [...prev, { ...card, isFlied: false }]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      setTimeout(() => {
        setPokemonCards((prev) => {
          const updated = prev.map((c) => {
            if (c.id === first.id || c.id === second.id) {
              if (first.name === second.name) return { ...c, isCorrect: true };
              return { ...c, isFlied: true };
            }
            return c;
          });

          if (updated.filter((c) => !c.isCorrect).length === 0) {
            setIsGameOver(true);
          }

          return updated;
        });

        setFlippedCards([]);
      }, 500);
    }
  }, [flippedCards]);

  return (
    <div className='relative'>
      <h2 className='text-2xl font-bold mb-6 text-center'>{difficulty}</h2>
      <ProgressBarTimer
        duration={60}
        onTimeout={() => setIsGameOver(true)}
        isGameOver={isGameOver}
      />
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-items-center'>
        {pokemonCards.map((card) => (
          <Card
            key={card.id}
            size='w-28 h-36'
            isFlied={card.isFlied}
            isCorrect={card.isCorrect}
            onFlip={() => handleFlip(card)}
            frontContent={
              <>
                <img
                  src={card.image}
                  alt={card.name}
                  className='w-16 h-16 object-contain'
                />
                <div className='mt-1 font-medium text-sm text-center'>
                  {card.name}
                </div>
              </>
            }
            backContent={
              <div className='bg-blue-500 w-full h-full rounded-lg' />
            }
          />
        ))}
      </div>
      {/* 게임 오버 팝업 */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className='bg-white rounded-lg p-8 text-center shadow-lg'
            >
              <h2 className='text-2xl font-bold mb-4'>게임 종료!</h2>
              <p className='mb-4'>
                모든 카드를 맞췄거나 시간이 종료되었습니다.
              </p>
              <Link to='/'>메인으로</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
