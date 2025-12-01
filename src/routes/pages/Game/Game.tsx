import { useParams, useNavigate, Navigate } from "react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "../../../components/Game/Card";
import CardFront from "../../../components/Game/CardFront";
import CardBack from "../../../components/Game/CardBack";
import GameGrid from "../../../components/Game/GameGrid";
import ProgressBarTimer from "../../../components/Game/ProgressBarTimer";
import Score from "../../../components/Game/Score";
import GameOverModal from "../../../components/Game/GameOverModal";
import { useGame } from "../../../hooks/useGame";

export default function Game() {
  const { difficulty } = useParams<{ difficulty: Difficulty }>();
  const navigate = useNavigate();

  const {
    pokemonCards,
    isGameOver,
    score,
    combo,
    isVictory,
    isHighScore,
    handleFlip,
    setHighScore,
    setIsGameOver,
  } = useGame(difficulty as Difficulty);

  const [playerName, setPlayerName] = useState("");

  if (
    !difficulty ||
    !(["easy", "normal", "hard"] as Difficulty[]).includes(difficulty)
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
          <figure key={card.id}>
            <Card
              pokemonType={card.type}
              isFliped={card.isFliped}
              isCorrect={card.isCorrect}
              onFlip={() => handleFlip(card)}
              frontContent={<CardFront {...card} />}
              backContent={<CardBack />}
            />
          </figure>
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
