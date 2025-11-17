import { useLoaderData, useParams } from "react-router";

export default function Game() {
  const { difficulty } = useParams();
  const pokemons = useLoaderData();
  console.log(pokemons);
  return (
    <>
      <h2>{difficulty}</h2>
    </>
  );
}
