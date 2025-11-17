import { Outlet } from "react-router";
import Header from "../../components/Common/Header/Header";

export default function Default() {
  return (
    <div className='bg-linear-to-r from-(--bg-color-primary) to-(--bg-color-secondary) font-default flex flex-col h-screen'>
      <Header />
      <Outlet />
      <footer>footer</footer>
    </div>
  );
}
