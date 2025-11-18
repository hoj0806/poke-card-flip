import { Link } from "react-router";

export default function NavigationButton({
  text,
  linkTo,
}: {
  text: string;
  linkTo: string;
}) {
  return (
    <>
      <Link to={linkTo}>
        <li className='bg-green-400 rounded-md text-2xl px-8 py-2'>{text}</li>
      </Link>
    </>
  );
}
