import DarkModeToggle from "../ui/DarkModeToggle";
import NavigationButton from "./NavigationButton";

export default function Header() {
  return (
    <header>
      <nav className='bg-yellow-200 flex'>
        <ul className='flex items-center justify-around my-3 w-full'>
          <li>
            <NavigationButton text='메인' linkTo='/' />
          </li>
          <li>
            <NavigationButton text='도감' linkTo='/pokedex' />
          </li>
          <li>
            <NavigationButton text='게임' linkTo='/selectDifficulty' />
          </li>
          <li>
            <NavigationButton text='하이 스코어' linkTo='/highscore' />
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
