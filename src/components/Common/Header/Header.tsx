import NavigationButton from "./NavigationButton";

export default function Header() {
  return (
    <nav className='bg-yellow-200'>
      <ul className='flex justify-around my-3'>
        <NavigationButton />
        <NavigationButton />
        <NavigationButton />
        <NavigationButton />
        <NavigationButton />
      </ul>
    </nav>
  );
}
