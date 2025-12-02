import { motion } from "framer-motion";

export default function RotatePokeball() {
  return (
    <div className='relative w-48 h-48 mb-8'>
      <motion.div
        className='w-40 h-40 bg-white border-8 border-black rounded-full flex items-center justify-center shadow-xl relative'
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      >
        <div className='absolute top-0 w-full h-1/2 bg-red-500 rounded-t-full border-b-8 border-black' />
        <div className='absolute w-12 h-12 bg-white border-8 border-black rounded-full' />
      </motion.div>
    </div>
  );
}
