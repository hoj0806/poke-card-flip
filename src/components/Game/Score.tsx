import type { ReactNode } from "react";

export default function Score({ children }: { children: ReactNode }) {
  return (
    <div
      className='
        bg-amber-500 
        w-[250px]
        border-4 border-black 
        rounded-lg 
        px-8 py-4 
        shadow-[4px_4px_0px_#000] 
        text-2xl 
        text-black
        tracking-wider
      '
    >
      {children}
    </div>
  );
}
