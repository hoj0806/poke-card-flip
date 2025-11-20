interface ButtonProps {
  text: string;
  linkTo: string;
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
