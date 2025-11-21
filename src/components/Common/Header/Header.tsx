import DarkModeToggle from "../ui/DarkModeToggle";
import NavigationButton from "./NavigationButton";

export default function Header() {
  return (
    <nav className='bg-yellow-200'>
      <ul className='flex justify-around my-3'>
        <NavigationButton text='메인' linkTo='/' />
        <NavigationButton text='도감' linkTo='/pokedex' />
        <NavigationButton text='게임' linkTo='/selectDifficulty' />
        <DarkModeToggle />
      </ul>
    </nav>
  );
}
