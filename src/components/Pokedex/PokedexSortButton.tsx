import type { PokedexSortButtonProps } from "../../types/Props";

export default function PokedexSortButton({
  children,
  onClick,
  selected = false,
}: PokedexSortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-md cursor-pointer text-white ${
        selected ? "bg-red-500" : "bg-yellow-600"
      }`}
    >
      {children}
    </button>
  );
}
