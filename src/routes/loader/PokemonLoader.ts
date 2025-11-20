import { usePokemonStore } from "../../store/pokemonStore";

export const pokemonLoader = async () => {
  const store = usePokemonStore.getState();

  if (store.pokemons.length > 0) {
    return null;
  }

  await store.fetchPokemonData();

  return null;
};
