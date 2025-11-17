import { useLoaderData, useParams } from "react-router";

export default function Game() {
  const { difficulty } = useParams();
  const pokemons = useLoaderData();

  return (
    <>
      <h2>{difficulty}</h2>
    </>
  );
}
