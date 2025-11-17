import type { PokedexSortButtonProps } from "../../types/Props";

export default function PokedexSortButton({
  children,
  onClick,
  selected,
}: PokedexSortButtonProps) {
  return (
    <>
      {selected}
      <button
        onClick={onClick}
        className={`${selected ? "bg-red-500" : "bg-yellow-600"}
          p-3 rounded-md  cursor-pointer text-white`}
      >
        {children}
      </button>
    </>
  );
}
