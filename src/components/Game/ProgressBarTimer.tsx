import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface ProgressBarTimerProps {
  duration?: number;
  onTimeout?: () => void;
  isGameOver?: boolean;
}

export default function ProgressBarTimer({
  duration = 60,
  onTimeout,
  isGameOver = false,
}: ProgressBarTimerProps) {
  const controls = useAnimation();
  console.log(isGameOver);
  useEffect(() => {
    if (!isGameOver) {
      controls
        .start({
          width: "0%",
          transition: { duration, ease: "linear" },
        })
        .then(() => {
          onTimeout?.();
        });
    } else {
      // 게임 오버면 애니메이션 멈춤
      controls.stop();
    }
  }, [isGameOver, controls, duration, onTimeout]);

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-md h-4 bg-gray-300 rounded-full overflow-hidden'>
        <motion.div
          className='h-full bg-amber-400'
          initial={{ width: "100%" }}
          animate={controls}
        />
      </div>
    </div>
  );
}
