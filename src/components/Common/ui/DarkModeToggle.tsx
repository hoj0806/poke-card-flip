import { useState } from "react";
import { motion } from "framer-motion";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleWidth = 64; // 포켓볼 이동 거리 = 버튼 width - 패딩 - 포켓볼 크기

  return (
    <div
      className={`relative w-28 h-12 rounded-full p-1 cursor-pointer ${
        isDark ? "bg-gray-700" : "bg-yellow-300"
      }`}
      onClick={() => setIsDark(!isDark)}
    >
      {/* 포켓볼 */}
      <motion.div
        className='absolute top-1/2 w-10 h-10 -translate-y-1/2 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center'
        animate={{ x: isDark ? toggleWidth : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* 포켓볼 디자인 */}
        <div className='relative w-8 h-8 rounded-full bg-red-500 overflow-hidden border-2 border-black'>
          <div className='absolute bottom-0 w-full h-1/2 bg-white' />
          <div className='absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full border-2 border-black -translate-x-1/2 -translate-y-1/2' />
        </div>
      </motion.div>

      {/* 아이콘 */}
      <div className='absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400'>
        ☀️
      </div>
      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-300'>
        🌙
      </div>
    </div>
  );
}
