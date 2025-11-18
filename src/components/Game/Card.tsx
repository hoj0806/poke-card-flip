import { cn } from "../../lib/utils";

interface CardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  size?: string;
  isFlied: boolean;
  onFlip: () => void;
}

export default function Card({
  frontContent,
  backContent,
  size = "w-32 h-40",
  isFlied,
  onFlip,
}: CardProps) {
  return (
    <button
      type='button'
      onClick={onFlip}
      className={cn("relative", size, "outline-none [perspective:50rem]")}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
          isFlied && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front */}
        <div className='absolute inset-0 w-full h-full rounded-xl border bg-white text-black flex flex-col items-center justify-center [backface-visibility:hidden]'>
          {frontContent}
        </div>

        {/* Back */}
        <div className='absolute inset-0 w-full h-full rounded-xl bg-gray-400 text-white flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]'>
          {backContent}
        </div>
      </div>
    </button>
  );
}
