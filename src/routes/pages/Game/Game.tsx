import { Link, useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { useState } from "react";
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
  const [playerName, setPlayerName] = useState("");
  const setHighScore = usePokemonStore((state) => state.setHighScore);
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
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  const handleFlip = (card: PokemonCard) => {
    if (isGameOver || flippedCards.length >= 2) return;
    if (!card.isFlied || card.isCorrect) return;

    // 카드 뒤집기
    const updatedCards = pokemonCards.map((c) =>
      c.id === card.id ? { ...c, isFlied: false } : c
    );
    setPokemonCards(updatedCards);

    // 뒤집힌 카드 추적
    const newFlipped = [...flippedCards, { ...card, isFlied: false }];

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      setTimeout(() => {
        const isMatch = first.name === second.name;

        // 카드 상태 업데이트
        setPokemonCards((prev) =>
          prev.map((c) => {
            if (c.id === first.id || c.id === second.id) {
              return isMatch
                ? { ...c, isCorrect: true }
                : { ...c, isFlied: true };
            }
            return c;
          })
        );

        // 콤보 및 스코어
        if (isMatch) {
          const newCombo = combo + 1;
          setCombo(newCombo);
          setScore((prevScore) => prevScore + newCombo);
        } else {
          setCombo(0);
        }

        // 게임 종료 체크
        const allCorrect = pokemonCards.every((c) =>
          c.isCorrect || c.id === first.id || c.id === second.id
            ? isMatch
            : c.isCorrect
        );
        if (allCorrect) setIsGameOver(true);

        setFlippedCards([]);
      }, 500);
    } else {
      setFlippedCards(newFlipped);
    }
  };

  return (
    <div className='relative'>
      <p>Score : {score}</p>
      <p>Combo : {combo}</p>
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
                  // 팝업 닫거나 메인으로 이동
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
