import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./Home";
import Default from "./layouts/Default";
import SelectDifficulty from "./pages/SelectDifficulty/SelectDifficulty";
import Game from "./pages/Game/Game";
import GameDefault from "./layouts/GameDefault";
import { pokemonLoader } from "./loader/PokemonLoader";
import PokedexDetail from "./pages/PokedexDetail/PokedexDetail";
import PokedexWrapper from "./layouts/PokedexWrapper";

const router = createBrowserRouter([
  {
    Component: Default,
    loader: pokemonLoader,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "pokedex",
        Component: PokedexWrapper,
        children: [
          {
            path: ":id",
            Component: PokedexDetail,
          },
        ],
      },
      {
        path: "selectDifficulty",
        Component: SelectDifficulty,
      },
      {
        path: "game",
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
