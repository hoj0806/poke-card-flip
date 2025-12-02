type ButtonColor = "sky" | "green" | "red" | "yellow";
interface ButtonProps {
  text: string;
  linkTo: string;
  color: ButtonColor;
}

interface PokedexSortButtonProps {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
}

interface PokedexButtonBoxProps {
  showBookmarks: boolean;
  setShowBookmarks: (value: boolean) => void;
}

interface PokedexGridProps {
  showBookmarks: boolean;
}

interface CardProps {
  isFliped: boolean;
  isCorrect?: boolean;
  onFlip: () => void;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  pokemonType: string;
}

interface ProgressBarTimerProps {
  duration?: number;
  onTimeout?: () => void;
  isGameOver?: boolean;
}

interface CardFrontProps {
  image: string;
  name: string;
}

interface GameOverModalProps {
  isGameOver: boolean;
  isVictory: boolean;
  isHighScore: boolean;
  playerName: string;
  score: number;
  nameError: boolean;
  onSave: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface GameGridProps {
  children: ReactNode;
  difficulty: Difficulty;
}

interface ScoreProps {
  text: string;
  content: number;
}

interface NavigationButtonProps {
  text: string;
  linkTo: string;
}

interface StatusScreenProps {
  type?: "loading" | "error";
  message?: string;
  status?: number | null;
}
