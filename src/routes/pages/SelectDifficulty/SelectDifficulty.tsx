import Button from "../../../components/Common/ui/Button";

export default function SelectDifficulty() {
  return (
    <>
      <div className='flex flex-col gap-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Button text='쉬움' linkTo='/game/easy' />
        <Button text='보통' linkTo='/game/normal' />
        <Button text='어려움' linkTo='/game/hard' />
        <Button text='메인으로' linkTo='/' />
      </div>
    </>
  );
}
