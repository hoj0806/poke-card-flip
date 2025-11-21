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
  isFlied: boolean;
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
