import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Button({ text, linkTo, color = "sky" }: ButtonProps) {
  const colorMap: Record<ButtonColor, string> = {
    sky: "bg-sky-300 hover:bg-sky-400",
    green: "bg-green-400 hover:bg-green-500",
    red: "bg-red-400 hover:bg-red-500",
    yellow: "bg-yellow-400 hover:bg-yellow-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Link
        to={linkTo}
        className={`
          w-[350px]
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
    </motion.div>
  );
}
