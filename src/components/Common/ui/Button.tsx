import { Link } from "react-router";

export default function Button({ text, linkTo }: ButtonProps) {
  return (
    <Link
      to={linkTo}
      className='bg-green-400 text-3xl px-36 py-3 cursor-pointer rounded-md text-center'
    >
      {text}
    </Link>
  );
}
