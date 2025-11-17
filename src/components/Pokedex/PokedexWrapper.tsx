import { useLoaderData } from "react-router";
import PokedexGrid from "./PokedexGrid";
import PokedexButtonBox from "./PokedexButtonBox";

export default function PokedexWrapper() {
  const pokemons = useLoaderData();
  console.log(pokemons);
  return (
    <>
      <section className='bg-yellow-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-md flex flex-col gap-4 h-3/4 w-1/2'>
        <h1 className='text-2xl text-center'>포켓몬 도감</h1>
        <PokedexButtonBox />
        <PokedexGrid />
      </section>
    </>
  );
}
