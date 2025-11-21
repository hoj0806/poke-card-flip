import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useColorThemeStore } from "../../../store/colorThemeStore";

export default function DarkModeToggle() {
  const colorTheme = useColorThemeStore((state) => state.colorTheme);
  const updateColorTheme = useColorThemeStore(
    (state) => state.updateColorTheme
  );

  const toggleWidth = 64;

  // 현재 다크 모드인지 계산
  const isDark =
    colorTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : colorTheme === "dark";

  // 페이지 로드 시 테마 적용
  useLayoutEffect(() => {
    if (colorTheme === "system") {
      document.documentElement.classList.remove("light", "dark");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
      }
    } else {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(colorTheme);
    }
  }, [colorTheme]);

  // 버튼 클릭 시 라이트 <-> 다크 토글
  const handleToggle = () => {
    if (colorTheme === "light") updateColorTheme("dark");
    else if (colorTheme === "dark") updateColorTheme("light");
    else {
      // system 모드면 현재 브라우저 테마 반대로
      updateColorTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "light"
          : "dark"
      );
    }
  };

  return (
    <div
      className={`relative w-28 h-12 rounded-full p-1 cursor-pointer ${
        isDark ? "bg-gray-700" : "bg-yellow-300"
      }`}
      onClick={handleToggle}
    >
      {/* 포켓볼 */}
      <motion.div
        className='absolute top-1/2 w-10 h-10 -translate-y-1/2 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center'
        animate={{ x: isDark ? toggleWidth : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* 포켓볼 디자인 */}
        <div className='relative w-8 h-8 rounded-full bg-red-500 overflow-hidden border-2 border-black dark:bg-black'>
          <div className='absolute bottom-0 w-full h-1/2 bg-white' />
          <div className='absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full border-2 border-black -translate-x-1/2 -translate-y-1/2' />
        </div>
      </motion.div>

      {/* 아이콘 */}
      <div className='absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400'></div>
      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-300'>
        {" "}
      </div>
    </div>
  );
}
