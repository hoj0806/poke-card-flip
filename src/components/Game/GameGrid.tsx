export default function GameGrid({ children, difficulty }: GameGridProps) {
  return (
    <>
      <section
        className={`
        grid justify-center 
        w-[620px] h-[620px] mx-auto my-auto mt-16 gap-2
        ${difficulty === "easy" ? "grid-cols-4 text-xl" : ""}
        ${difficulty === "normal" ? "grid-cols-5" : ""}
        ${difficulty === "hard" ? "w-[870px] h-[660px] grid-cols-7" : ""}
     
      `}
      >
        {children}
      </section>
    </>
  );
}
