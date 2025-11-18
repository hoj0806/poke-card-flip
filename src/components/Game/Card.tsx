import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  size?: string;
  isFlied: boolean;
  isCorrect?: boolean;
  onFlip: () => void;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export default function Card({
  size = "w-32 h-40",
  isFlied,
  isCorrect = false,
  onFlip,
  frontContent,
  backContent,
  className = "",
}: CardProps) {
  return (
    <button
      type='button'
      onClick={onFlip}
      className={cn(
        "relative perspective-1000 outline-none",
        size,
        className,
        isCorrect && "opacity-0 pointer-events-none" // 안보이면서 클릭 방지
      )}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
          !isFlied && "[transform:rotateY(180deg)]"
        )}
      >
        <div className='absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gray-200 flex items-center justify-center rounded-lg'>
          {backContent}
        </div>
        <div className='absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white flex flex-col items-center justify-center rounded-lg p-2'>
          {frontContent}
        </div>
      </div>
    </button>
  );
}
