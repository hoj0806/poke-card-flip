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
  const [nameError, setNameError] = useState(false);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setPlayerName(e.target.value);
  };

  const handleSave = () => {
    if (isHighScore && playerName.trim() === "") {
      setNameError(true);
      return;
    }

    if (difficulty && isHighScore) {
      setHighScore(difficulty as Difficulty, playerName.trim(), score);
    }
    navigate("/");
  };
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
          handleChangeInput={handleChangeInput}
          isGameOver={isGameOver}
          isVictory={isVictory}
          isHighScore={isHighScore}
          playerName={playerName}
          score={score}
          nameError={nameError}
          onSave={handleSave}
        />
      </AnimatePresence>
    </div>
  );
}
