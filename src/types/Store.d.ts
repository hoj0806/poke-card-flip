type Sort = "desc" | "asc";
interface PokemonStore {
  pokemons: PokemonData[];
  fetchPokemonData: () => Promise<void>;
  sortById: Sort;
  sortByName: Sort;
  sortByType: Sort;
  sortBy: "none" | "id" | "name" | "type";
  sortToggle: (key: "id" | "name" | "type") => void;
  sortReset: () => void;
}
