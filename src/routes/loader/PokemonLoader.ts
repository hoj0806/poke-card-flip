import { usePokemonStore } from "../../store/pokemonStore";

export const pokemonLoader = async () => {
  const fetchPokemonData = usePokemonStore.getState().fetchPokemonData;

  await fetchPokemonData();

  return null;
};
