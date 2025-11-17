interface PokemonStore {
  pokemons: PokemonData[];
  fetchPokemonData: () => Promise<void>;
}
