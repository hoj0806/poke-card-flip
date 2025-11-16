import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "",
    Component: Home,
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
