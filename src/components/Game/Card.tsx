import { cn, getGradientByElement } from "../../lib/utils";
import type { PokemonElement } from "../../types/Pokemon";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      {!isCorrect && (
        <motion.div
          onClick={onFlip}
          className={cn("relative cursor-pointer perspective-1000", className)}
          style={{ width: "100%", height: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
