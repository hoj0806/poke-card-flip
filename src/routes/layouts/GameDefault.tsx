import { Outlet } from "react-router";
import ProgressBarTimer from "../../components/Game/ProgressBarTimer";

export default function GameDefault() {
  return (
    <>
      <h1>GameDefault Component</h1>
      <ProgressBarTimer />
      <Outlet />
    </>
  );
}
