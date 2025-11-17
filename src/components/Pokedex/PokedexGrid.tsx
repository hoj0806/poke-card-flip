import { useLoaderData } from "react-router";
import PokedexList from "./PokedexList";

export default function PokedexGrid() {
  const pokemons = useLoaderData();

  return (
    <>
      <ol className='bg-gray-200/60 backdrop-blur-lg  rounded-xl overflow-y-auto grid grid-cols-4 place-items-center gap-7 py-3 border border-gray-300 shadow-md'>
        {pokemons.map((pokemon: PokemonData) => (
          <PokedexList key={pokemon.id} {...pokemon} />
        ))}
      </ol>
    </>
  );
}
