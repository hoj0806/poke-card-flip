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
  const [playerName, setPlayerName] = useState("");
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
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [pokemonCards]);

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
      <div className='flex flex-col gap-4 w-fit absolute top-10 left-10'>
        <Score>
          <p className='drop-shadow-[1px_1px_0px_#fff]'>SCORE : {score}</p>
        </Score>
        <Score>
          <p className='drop-shadow-[1px_1px_0px_#fff]'>COMBO : {combo}</p>
        </Score>
      </div>
      <ProgressBarTimer
        duration={1000}
        onTimeout={() => setIsGameOver(true)}
        isGameOver={isGameOver}
      />
      <div
        className={`

    grid
    justify-center 
    w-[620px]
    h-[620px]
    mx-auto
    my-auto
    mt-16
    gap-2
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
