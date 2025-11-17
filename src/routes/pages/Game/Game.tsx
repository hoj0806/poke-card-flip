import { useParams } from "react-router";

export default function Game() {
  const { difficulty } = useParams();
  console.log(difficulty);
  return (
    <>
      <h1>Game Component</h1>
      <h2>{difficulty}</h2>
    </>
  );
}
