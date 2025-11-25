import { useParams, useNavigate, Navigate } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { useEffect, useState } from "react";
import Card from "../../../components/Game/Card";
import ProgressBarTimer from "../../../components/Game/ProgressBarTimer";
import { AnimatePresence } from "framer-motion";
import Score from "../../../components/Game/Score";
import GameOverModal from "../../../components/Game/GameOverModal";
import GameGrid from "../../../components/Game/GameGrid";
import CardBack from "../../../components/Game/CardBack";
import CardFront from "../../../components/Game/CardFront";

export default function Game() {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const pokemons = usePokemonStore((state) => state.pokemons);
  const setHighScore = usePokemonStore((state) => state.setHighScore);
  const highScoreStore = usePokemonStore((state) => state.highScore);

  const [isInitialFlipping, setIsInitialFlipping] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [flippedCards, setFlippedCards] = useState<PokemonCard[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

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
          isFliped: false,
          isCorrect: false,
          type: p.types[0],
        },
        {
          id: `${p.id}-2`,
          name: p.name,
          image: p.image,
          isFliped: false,
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
        prev.map((card) => ({ ...card, isFliped: true }))
      );
      setIsInitialFlipping(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [pokemonCards.length]);

  const handleFlip = (selectCard: PokemonCard) => {
    if (isInitialFlipping) return;
    if (!selectCard.isFliped || selectCard.isCorrect) return;
    if (flippedCards.length >= 2) return;

    const updatedCards = pokemonCards.map((card) =>
      card.id === selectCard.id ? { ...card, isFliped: false } : card
    );
    setPokemonCards(updatedCards);

    const newFlipped = [...flippedCards, { ...selectCard, isFliped: false }];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [card1, card2] = newFlipped;

      if (card1.name === card2.name) {
        setTimeout(() => {
          setPokemonCards((prev) =>
            prev.map((card) =>
              card.name === card1.name ? { ...card, isCorrect: true } : card
            )
          );
        }, 400);
        setScore((s) => s + combo + 1);
        setCombo((c) => c + 1);
        setFlippedCards([]);

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
                ? { ...card, isFliped: true }
                : card
            )
          );
          setFlippedCards([]);
        }, 500);
        setCombo(0);
      }
    }
  };

  const isVictory = pokemonCards.every((card) => card.isCorrect);
  const currentHighScores = highScoreStore[difficulty as Difficulty] || [];
  const lowestHighScore = currentHighScores.length
    ? Math.min(...currentHighScores.map((h) => h.score))
    : 0;
  const isHighScore = score > lowestHighScore;

  if (
    difficulty !== "easy" &&
    difficulty !== "normal" &&
    difficulty !== "hard"
  ) {
    return <Navigate to='/404' replace />;
  }

  return (
    <div className='relative'>
      <div className='flex flex-col gap-4 w-fit absolute top-10 left-10'>
        <Score text='SCORE' content={score} />
        <Score text='COMBO' content={combo} />
      </div>

      <ProgressBarTimer
        duration={60}
        onTimeout={() => setIsGameOver(true)}
        isGameOver={isGameOver}
      />
      <GameGrid difficulty={difficulty}>
        {pokemonCards.map((card) => (
          <div key={card.id}>
            <Card
              pokemonType={card.type}
              isFliped={card.isFliped}
              isCorrect={card.isCorrect}
              onFlip={() => handleFlip(card)}
              frontContent={<CardFront {...card} />}
              backContent={<CardBack />}
            />
          </div>
        ))}
      </GameGrid>

      <AnimatePresence>
        <GameOverModal
          isGameOver={isGameOver}
          isVictory={isVictory}
          isHighScore={isHighScore}
          playerName={playerName}
          setPlayerName={setPlayerName}
          score={score}
          onSave={() => {
            if (isHighScore && !playerName)
              return alert("이름을 입력해주세요!");
            if (difficulty && isHighScore) {
              setHighScore(difficulty as Difficulty, playerName, score);
            }
            navigate("/");
          }}
        />
      </AnimatePresence>
    </div>
  );
}
