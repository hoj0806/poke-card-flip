import { Link, NavLink } from "react-router";

export default function NavigationButton({
  text,
  linkTo,
}: {
  text: string;
  linkTo: string;
}) {
  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) =>
        `
        relative
        text-2xl
        rounded-sm
        px-10 py-3
        transform transition duration-100
        cursor-pointer
        list-none
        ${
          isActive
            ? "bg-red-500 text-black"
            : "bg-green-500 text-white hover:bg-green-600 hover:text-black"
        }
        
      `
      }
    >
      {text}
    </NavLink>
  );
}
