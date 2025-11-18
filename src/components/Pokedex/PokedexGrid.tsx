// PokedexGrid.tsx
import { usePokemonStore } from "../../store/pokemonStore";
import PokedexList from "./PokedexList";

interface PokedexGridProps {
  showBookmarks: boolean;
}

export default function PokedexGrid({ showBookmarks }: PokedexGridProps) {
  const pokemons = usePokemonStore((state) => state.pokemons);

  const displayedPokemons = showBookmarks
    ? pokemons.filter((p) => p.bookmark)
    : pokemons;

  if (displayedPokemons.length === 0 && showBookmarks)
    return <p>북마크중인 포켓몬이 없습니다</p>;

  return (
    <ol className='bg-gray-200/60 backdrop-blur-lg rounded-xl overflow-y-auto grid grid-cols-4 place-items-center gap-7 py-3 border border-gray-300 shadow-md'>
      {displayedPokemons.map((pokemon) => (
        <PokedexList key={pokemon.id} {...pokemon} />
      ))}
    </ol>
  );
}
