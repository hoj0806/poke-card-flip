import { motion } from "framer-motion";

interface ProgressBarTimerProps {
  duration?: number;
  onTimeout?: () => void;
}

export default function ProgressBarTimer({
  duration = 60,
  onTimeout,
}: ProgressBarTimerProps) {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-md h-4 bg-gray-300 rounded-full overflow-hidden'>
        <motion.div
          className='h-full bg-amber-400'
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{
            duration,
            ease: "linear",
          }}
          onAnimationComplete={onTimeout}
        />
      </div>
    </div>
  );
}
