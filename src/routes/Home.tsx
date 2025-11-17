import Button from "../components/Common/ui/Button";

export default function Home() {
  return (
    <div className='flex flex-col gap-8 absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Button text='게임시작' linkTo='/selectDifficulty' />
      <Button text='게임시작' linkTo='/selectDifficulty' />
    </div>
  );
}
