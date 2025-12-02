import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./Home";
import Default from "./layouts/Default";
import SelectDifficulty from "./pages/SelectDifficulty/SelectDifficulty";
import Game from "./pages/Game/Game";
import GameDefault from "./layouts/GameDefault";
import { pokemonLoader } from "./loader/PokemonLoader";
import PokedexDetail from "./pages/PokedexDetail/PokedexDetail";
import Pokedex from "./pages/Pokedex/PokedexWrapper";
import HighScore from "./pages/highscore/HighScore";
import NotFound from "./pages/NotFound/NotFound";
import StatusScreen from "../components/Common/ui/StatusScreen";

const router = createBrowserRouter([
  {
    Component: Default,
    loader: pokemonLoader,
    HydrateFallback: StatusScreen,
    errorElement: <StatusScreen type='error' />,
    children: [
      { path: "", Component: Home },
      { path: "highscore", Component: HighScore },
      {
        path: "pokedex",
        Component: Pokedex,
        children: [{ path: ":id", Component: PokedexDetail }],
      },
      { path: "selectDifficulty", Component: SelectDifficulty },
      {
        path: "game",
        Component: GameDefault,
        children: [
          { index: true, element: <Navigate to='easy' replace /> },
          { path: ":difficulty", Component: Game },
        ],
      },
      { path: "notfound", Component: NotFound },
      { path: "*", Component: NotFound },
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
