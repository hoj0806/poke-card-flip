import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./Home";
import Pokedex from "./pages/Pokedex/Pokedex";
import Default from "./layouts/Default";
import SelectDifficulty from "./pages/SelectDifficulty/SelectDifficulty";
import Game from "./pages/Game/Game";
import GameDefault from "./layouts/GameDefault";

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
      {
        path: "/game",
        Component: GameDefault,
        children: [
          {
            index: true,
            element: <Navigate to='easy' replace />,
          },
          {
            path: ":difficulty",
            Component: Game,
          },
        ],
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
