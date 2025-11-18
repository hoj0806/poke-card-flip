import NavigationButton from "./NavigationButton";

export default function Header() {
  return (
    <nav className='bg-yellow-200'>
      <ul className='flex justify-around my-3'>
        <NavigationButton text='메인' linkTo='/' />
        <NavigationButton text='도감' linkTo='/pokedex' />
        <NavigationButton text='게임(쉬움)' linkTo='/game/easy' />
        <NavigationButton text='게임(보통)' linkTo='/game/normal' />
        <NavigationButton text='게임(어려움)' linkTo='/game/hard' />
      </ul>
    </nav>
  );
}
