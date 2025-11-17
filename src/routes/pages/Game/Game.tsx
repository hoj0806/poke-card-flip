import { useEffect } from "react";
import { useParams } from "react-router";

import { usePokemonStore } from "../../../store/pokemonStore";

export default function Game() {
  const { difficulty } = useParams();

  const pokemon = usePokemonStore((state) => state.pokemons);
  const fetchPokemonData = usePokemonStore((state) => state.fetchPokemonData);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  console.log(pokemon);
  return (
    <>
      <h1>Game Component</h1>
      <h2>{difficulty}</h2>
    </>
  );
}
