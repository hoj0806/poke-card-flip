import { useState } from "react";
import { usePokemonStore } from "../../../store/pokemonStore";

export default function HighScore() {
  const highScore = usePokemonStore((state) => state.highScore);
  const { easy, normal, hard } = highScore;

  const [selected, setSelected] = useState<"easy" | "normal" | "hard">("easy");

  const getScores = () => {
    switch (selected) {
      case "easy":
        return easy;
      case "normal":
        return normal;
      case "hard":
        return hard;
      default:
        return [];
    }
  };

  const selectedScores = getScores();

  return (
    <div className='flex flex-col items-center gap-6 mt-10 px-4'>
      <h1 className='text-4xl font-bold mb-4'>하이 스코어</h1>

      <div className='flex gap-4'>
        {["easy", "normal", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setSelected(level as "easy" | "normal" | "hard")}
            className={`cursor-pointer
              px-6 py-2 rounded-lg font-bold transition
              capitalize
              ${
                selected === level
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {level}
          </button>
        ))}
      </div>

      <div className='w-full max-w-md bg-white shadow-xl rounded-lg p-6'>
        {selectedScores.length === 0 ? (
          <p className='text-gray-500'>아직 기록된 스코어가 없습니다.</p>
        ) : (
          <ul className='space-y-3'>
            {selectedScores.map((record, idx) => (
              <li
                key={idx}
                className='p-3 bg-gray-100 rounded-md shadow-sm flex justify-between'
              >
                <span className='font-medium'>#{idx + 1}</span>

                <div className='flex flex-col text-right'>
                  <span className='font-bold'>{record.name}</span>
                  <span className='text-sm text-gray-600'>
                    점수: {record.score}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
