import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function ProgressBarTimer({
  duration = 60,
  onTimeout,
  isGameOver = false,
}: ProgressBarTimerProps) {
  const controls = useAnimation();

  useEffect(() => {
    let timer: number;

    if (!isGameOver) {
      timer = window.setTimeout(() => {
        controls
          .start({
            width: "0%",
            transition: { duration, ease: "linear" },
          })
          .then(() => {
            onTimeout?.();
          });
      }, 2000);
    } else {
      controls.stop();
    }

    return () => clearTimeout(timer);
  }, [isGameOver, controls, duration, onTimeout]);

  return (
    <div className='w-full flex justify-center mt-4'>
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
