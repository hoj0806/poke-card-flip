import { Outlet } from "react-router";

export default function Default() {
  return (
    <div className='bg-linear-to-r from-(--bg-color-primary) to-(--bg-color-secondary) h-screen'>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </div>
  );
}
