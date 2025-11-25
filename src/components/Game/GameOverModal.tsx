import { motion } from "framer-motion";
import { Link } from "react-router";

export default function GameOverModal({
  isGameOver,
  isVictory,
  isHighScore,
  playerName,
  setPlayerName,
  score,
  onSave,
}: GameOverModalProps) {
  if (!isGameOver) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className='bg-white rounded-xl p-12 text-center shadow-xl max-w-lg w-full'
      >
        <h2 className='text-3xl md:text-4xl font-bold mb-6'>
          {isVictory ? "승리!" : "게임 종료!"}
        </h2>

        <p className='text-2xl font-semibold mb-4'>최종 점수: {score}</p>

        {isHighScore && (
          <div className='mb-6'>
            <p className='text-red-500 font-bold mb-3 text-2xl'>
              하이스코어 달성!
            </p>
            <input
              type='text'
              maxLength={15}
              placeholder='이름을 입력하세요'
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-amber-300 text-lg'
            />
          </div>
        )}

        <div className='flex justify-center gap-4'>
          <button
            onClick={onSave}
            className='bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 text-lg cursor-pointer'
          >
            저장
          </button>

          <button className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg'>
            <Link to='/'>메인으로</Link>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
