import { useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { useState } from "react";

export default function Game() {
  const { difficulty } = useParams();
  const pokemons = usePokemonStore((state) => state.pokemons);

  const [pokemonCards, setPokemonCards] = useState(() => {
    if (!pokemons || pokemons.length === 0) return [];

    let cardCount = 6; // default easy
    if (difficulty === "normal") cardCount = 10;
    else if (difficulty === "hard") cardCount = 15;

    const selectedPokemons = [...pokemons]
      .sort(() => Math.random() - 0.5)
      .slice(0, cardCount);

    const cards = selectedPokemons.flatMap((p) => [
      {
        id: `${p.id}-1`,
        name: p.name,
        isCorrect: false,
        isFlied: false,
        type: p.types[0],
      },
      {
        id: `${p.id}-2`,
        name: p.name,
        isCorrect: false,
        isFlied: false,
        type: p.types[0],
      },
    ]);

    return cards.sort(() => Math.random() - 0.5);
  });

  return (
    <>
      <h2>{difficulty}</h2>
      <div>{pokemonCards.map((p) => p.name).join(",")}</div>
    </>
  );
}
