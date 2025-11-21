import { Outlet } from "react-router";
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer";

export default function Default() {
  return (
    <div
      className='bg-linear-to-r from-(--bg-color-primary) to-(--bg-color-secondary) font-default flex flex-col h-screen relative  dark:from-gray-800 
        dark:to-gray-600'
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
