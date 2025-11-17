import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";
import Pokedex from "./pages/Pokedex/Pokedex";
import Default from "./layouts/Default";
import SelectDifficulty from "./pages/SelectDifficulty/SelectDifficulty";

const router = createBrowserRouter([
  {
    Component: Default,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/pokedex",
        Component: Pokedex,
      },
      {
        path: "/selectDifficulty",
        Component: SelectDifficulty,
      },
    ],
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
