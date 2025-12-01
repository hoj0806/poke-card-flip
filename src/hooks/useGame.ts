import { useEffect, useState } from "react";
import { usePokemonStore } from "../store/pokemonStore";

export function useGame(difficulty: Difficulty) {
  const pokemons = usePokemonStore((state) => state.pokemons);
  const setHighScore = usePokemonStore((state) => state.setHighScore);
  const highScoreStore = usePokemonStore((state) => state.highScore);

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

  const [flippedCards, setFlippedCards] = useState<PokemonCard[]>([]);
  const [isInitialFlipping, setIsInitialFlipping] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

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
              [card1.id, card2.id].includes(card.id)
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
  const currentHighScores = highScoreStore[difficulty] || [];
  const lowestHighScore = currentHighScores.length
    ? Math.min(...currentHighScores.map((h) => h.score))
    : 0;
  const isHighScore = score > lowestHighScore;

  return {
    pokemonCards,
    isGameOver,
    score,
    combo,
    isVictory,
    isHighScore,
    handleFlip,
    setPokemonCards,
    setFlippedCards,
    setIsGameOver,
    setScore,
    setCombo,
    setHighScore,
  };
}
