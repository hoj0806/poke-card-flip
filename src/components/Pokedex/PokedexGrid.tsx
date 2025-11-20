import { usePokemonStore } from "../../store/pokemonStore";
import PokedexList from "./PokedexList";

export default function PokedexGrid({ showBookmarks }: PokedexGridProps) {
  const pokemons = usePokemonStore((state) => state.pokemons);

  const displayedPokemons = showBookmarks
    ? pokemons.filter((p) => p.bookmark)
    : pokemons;

  if (displayedPokemons.length === 0 && showBookmarks)
    return (
      <div className='flex justify-center items-center min-h-[550px] bg-amber-200'>
        <p className='text-gray-700 text-lg'>북마크중인 포켓몬이 없습니다</p>
      </div>
    );

  return (
    <ol
      className='
        bg-gray-200/60 backdrop-blur-lg rounded-xl overflow-y-auto 
        grid grid-cols-5 place-items-center gap-11 p-4 border border-gray-300 shadow-md
        scrollbar scrollbar-thumb-black scrollbar-track-black/20 scrollbar-w-3
      '
    >
      {displayedPokemons.map((pokemon) => (
        <PokedexList key={pokemon.id} {...pokemon} />
      ))}
    </ol>
  );
}
