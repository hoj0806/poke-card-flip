type Sort = "asc" | "desc";
type Difficulty = "easy" | "normal" | "hard";
type SortBy = "none" | "id" | "name" | "type";
type ColorTheme = "light" | "dark" | "system";
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
  setHighScore: (difficulty: Difficulty, name: string, score: number) => void;

  pokemons: PokemonData[];
  sortById: Sort;
  sortByName: Sort;
  sortByType: Sort;
  sortBy: SortBy;

  toggleBookMarkPokemon: (id: number) => void;
  fetchPokemonData: () => Promise<void>;
  sortToggle: (key: Omit<SortBy, "none">) => void;
  sortReset: () => void;
}
interface ColorThemeStore {
  colorTheme: ColorTheme;
  updateColorTheme: (theme: ColorTheme) => void;
}
