import { Link, useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { useEffect, useState } from "react";
import Card from "../../../components/Game/Card";
import ProgressBarTimer from "../../../components/Game/ProgressBarTimer";
import { motion, AnimatePresence } from "framer-motion";
import Score from "../../../components/Game/Score";

export default function Game() {
  const { difficulty } = useParams();
  const pokemons = usePokemonStore((state) => state.pokemons);
  const [isInitialFlipping, setIsInitialFlipping] = useState(true);

  const [playerName, setPlayerName] = useState("");
  const [flippedCards, setFlippedCards] = useState<PokemonCard[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const setHighScore = usePokemonStore((state) => state.setHighScore);

  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>(() => {
    if (!pokemons || pokemons.length === 0) return [];

    let cardCount = 6;
    if (difficulty === "normal") cardCount = 10;
    else if (difficulty === "hard") cardCount = 14;

    const selectedPokemons = [...pokemons]
      .sort(() => Math.random() - 0.5)
      .slice(0, cardCount);

    return selectedPokemons
      .flatMap((p) => [
        {
          id: `${p.id}-1`,
          name: p.name,
          image: p.image,
          isFlied: false,
          isCorrect: false,
          type: p.types[0],
        },
        {
          id: `${p.id}-2`,
          name: p.name,
          image: p.image,
          isFlied: false,
          isCorrect: false,
          type: p.types[0],
        },
      ])
      .sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    if (pokemonCards.length === 0) return;
    const timer = setTimeout(() => {
      setPokemonCards((prev) =>
        prev.map((card) => ({ ...card, isFlied: true }))
      );
      setIsInitialFlipping(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pokemonCards.length]);

  const handleFlip = (selectCard: PokemonCard) => {
    if (isInitialFlipping) return;
    if (!selectCard.isFlied || selectCard.isCorrect) return;
    if (flippedCards.length >= 2) return;

    const updatedCards = pokemonCards.map((card) =>
      card.id === selectCard.id ? { ...card, isFlied: false } : card
    );
    setPokemonCards(updatedCards);

    const newFlipped = [...flippedCards, { ...selectCard, isFlied: false }];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [card1, card2] = newFlipped;

      if (card1.name === card2.name) {
        setPokemonCards((prev) =>
          prev.map((card) =>
            card.name === card1.name ? { ...card, isCorrect: true } : card
          )
        );
        setScore((s) => s + combo + 1);
        setCombo((c) => c + 1);
        setFlippedCards([]);

        // 모든 카드가 맞았는지 확인
        const allCorrect = updatedCards.every(
          (card) =>
            card.isCorrect || card.id === card1.id || card.id === card2.id
        );
        if (allCorrect) setIsGameOver(true);
      } else {
        setTimeout(() => {
          setPokemonCards((prev) =>
            prev.map((card) =>
              card.id === card1.id || card.id === card2.id
                ? { ...card, isFlied: true }
                : card
            )
          );
          setFlippedCards([]);
        }, 500);
        setCombo(0);
      }
    }
  };

  return (
    <div className='relative'>
      <div className='flex flex-col gap-4 w-fit absolute top-10 left-10'>
        <Score>
          <p className='drop-shadow-[1px_1px_0px_#fff]'>SCORE : {score}</p>
        </Score>
        <Score>
          <p className='drop-shadow-[1px_1px_0px_#fff]'>COMBO : {combo}</p>
        </Score>
      </div>

      <ProgressBarTimer
        duration={60}
        onTimeout={() => setIsGameOver(true)}
        isGameOver={isGameOver}
      />

      <div
        className={`
        grid justify-center 
        w-[620px] h-[620px] mx-auto my-auto mt-16 gap-2
        ${difficulty === "hard" ? "w-[870px] h-[660px]" : ""}
        ${difficulty === "easy" ? "grid-cols-4" : ""}
        ${difficulty === "normal" ? "grid-cols-5" : ""}
        ${difficulty === "hard" ? "grid-cols-7" : ""}
      `}
      >
        {pokemonCards.map((card) => (
          <div key={card.id}>
            <Card
              pokemonType={card.type}
              isFlied={card.isFlied}
              isCorrect={card.isCorrect}
              onFlip={() => handleFlip(card)}
              frontContent={
                <div className='flex flex-col items-center justify-center'>
                  <img
                    src={card.image}
                    alt={card.name}
                    className='object-contain'
                  />
                  <p className='text-[12px] md:text-sm lg:text-base text-center'>
                    {card.name}
                  </p>
                </div>
              }
              backContent={
                <div
                  className='w-full h-full rounded-lg'
                  style={{
                    backgroundImage: "url('/image/pokeball.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              }
            />
          </div>
        ))}
      </div>

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

              <div className='mb-4'>
                <input
                  type='text'
                  placeholder='이름을 입력하세요'
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className='border border-gray-300 rounded px-2 py-1 w-full'
                />
              </div>

              <button
                onClick={() => {
                  if (!playerName) return alert("이름을 입력해주세요!");
                  if (difficulty) {
                    setHighScore(
                      difficulty as "easy" | "normal" | "hard",
                      playerName,
                      score
                    );
                  }
                }}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
              >
                저장
              </button>

              <Link to='/' className='text-blue-500 underline ml-4'>
                메인으로
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
