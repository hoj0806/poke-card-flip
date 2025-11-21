import { Link } from "react-router";

export default function Button({ text, linkTo, color = "sky" }: ButtonProps) {
  // Tailwind 색상 맵
  const colorMap: Record<ButtonColor, string> = {
    sky: "bg-sky-300 hover:bg-sky-400",
    green: "bg-green-400 hover:bg-green-500",
    red: "bg-red-400 hover:bg-red-500",
    yellow: "bg-yellow-400 hover:bg-yellow-500",
  };

  return (
    <Link
      to={linkTo}
      className={`
        inline-block
        px-25
        py-4
        text-3xl  
        text-white
        border-4 border-black
        shadow-[4px_4px_0_0_black]
        active:shadow-none active:translate-x-1 active:translate-y-1
        rounded-md
        text-center
        ${colorMap[color]}
        hover:text-black
      `}
    >
      {text}
    </Link>
  );
}
