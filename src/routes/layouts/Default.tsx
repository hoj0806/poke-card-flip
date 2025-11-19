import { Outlet } from "react-router";
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer";
import DarkModeToggle from "../../components/Common/ui/DarkModeToggle";

export default function Default() {
  return (
    <div className='bg-linear-to-r from-(--bg-color-primary) to-(--bg-color-secondary) font-default flex flex-col h-screen relative'>
      <Header />
      <DarkModeToggle />
      <Outlet />
      <Footer />
    </div>
  );
}
