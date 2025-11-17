import type { ReactNode } from "react";

interface ButtonProps {
  text: string;
  linkTo: string;
}

interface PokedexSortButtonProps {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
}
