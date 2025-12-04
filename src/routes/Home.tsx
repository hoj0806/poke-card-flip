import Button from "../components/Common/ui/Button";
import Logo from "../components/Main/Logo";

export default function Home() {
  return (
    <div className='flex flex-col gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='flex flex-col gap-80'>
        <Logo />
        <div className='flex flex-col gap-6 items-center'>
          <Button text='게임시작' linkTo='/selectDifficulty' color='sky' />
          <Button text='도감' linkTo='/pokedex' color='sky' />
        </div>
      </div>
    </div>
  );
}
