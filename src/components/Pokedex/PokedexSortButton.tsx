export default function PokedexSortButton({
  children,
  onClick,
  selected = false,
}: PokedexSortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-3 rounded-lg font-semibold select-none
        transition-all active:translate-y-1 cursor-pointer hover:text-black
        ${
          selected
            ? "bg-red-500 text-black shadow-[0_6px_0_0_#b91c1c] active:shadow-[0_2px_0_0_#b91c1c]"
            : "bg-yellow-500 text-white shadow-[0_6px_0_0_#b8860b] active:shadow-[0_2px_0_0_#b8860b]"
        }
        before:content-[''] before:absolute before:inset-0 before:rounded-lg 
        before:border-t before:border-white/40 before:pointer-events-none
      `}
    >
      {children}
    </button>
  );
}
