import { Outlet } from "react-router";
import Header from "../../components/Common/Header/Header";

export default function Default() {
  return (
    <div className='bg-linear-to-r from-(--bg-color-primary) to-(--bg-color-secondary) h-screen font-default'>
      <Header />
      <Outlet />
      <footer>footer</footer>
    </div>
  );
}
