import { cn, getGradientByElement } from "../../lib/utils";
import type { PokemonElement } from "../../types/Pokemon";

export default function Card({
  isFlied,
  isCorrect = false,
  onFlip,
  frontContent,
  backContent,
  className = "",
  pokemonType,
}: CardProps) {
  const firstType = pokemonType as PokemonElement;
  return (
    <div
      onClick={onFlip}
      className={cn(
        "relative cursor-pointer perspective-1000",
        className,
        isCorrect && "opacity-0 pointer-events-none"
      )}
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
          !isFlied && "[transform:rotateY(180deg)]"
        )}
      >
        {/* 뒤집힌 면 */}
        <div className='absolute inset-0 rounded-lg [backface-visibility:hidden] flex items-center justify-center border-2 border-black bg-cover bg-center'>
          {backContent}
        </div>
        {/* 앞면 */}
        <div
          className={`absolute inset-0 rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-2 bg-linear-to-br ${getGradientByElement(
            firstType
          )}`}
        >
          {frontContent}
        </div>
      </div>
    </div>
  );
}
