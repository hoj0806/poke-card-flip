type Sort = "asc" | "desc";

interface ScoreRecord {
  name: string;
  score: number;
}

interface HighScore {
  easy: ScoreRecord[];
  normal: ScoreRecord[];
  hard: ScoreRecord[];
}

interface PokemonStore {
  highScore: HighScore;
  setHighScore: (
    difficulty: "easy" | "normal" | "hard",
    name: string,
    score: number
  ) => void;

  pokemons: PokemonData[];
  sortById: "asc" | "desc";
  sortByName: "asc" | "desc";
  sortByType: "asc" | "desc";
  sortBy: "none" | "id" | "name" | "type";

  toggleBookMarkPokemon: (id: number) => void;
  fetchPokemonData: () => Promise<void>;
  sortToggle: (key: "id" | "name" | "type") => void;
  sortReset: () => void;
}
