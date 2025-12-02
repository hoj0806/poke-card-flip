export default function Score({ text, content }: ScoreProps) {
  return (
    <div
      className='
        bg-amber-500
        dark:text-white 
        dark:bg-[#5e785d]
        w-[250px]
        border-4 border-black 
        rounded-lg 
        px-8 py-4 
        shadow-[4px_4px_0px_#000] 
        text-2xl 
        text-black
        tracking-wider
      '
    >
      <p className='drop-shadow-[1px_1px_0px_#fff]'>
        {text} : {content}
      </p>
    </div>
  );
}
