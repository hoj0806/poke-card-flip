import { usePokemonStore } from "../../store/pokemonStore";
import PokedexSortButton from "./PokedexSortButton";

export default function PokedexButtonBox({
  showBookmarks,
  setShowBookmarks,
}: PokedexButtonBoxProps) {
  const sortById = usePokemonStore((s) => s.sortById);
  const sortByName = usePokemonStore((s) => s.sortByName);
  const sortByType = usePokemonStore((s) => s.sortByType);
  const sortBy = usePokemonStore((s) => s.sortBy);
  const sortToggle = usePokemonStore((s) => s.sortToggle);
  const sortReset = usePokemonStore((s) => s.sortReset);

  return (
    <div className='flex gap-8 justify-between'>
      <PokedexSortButton
        onClick={() => sortToggle("id")}
        selected={sortBy === "id" || sortBy === "none"}
      >
        도감순 {sortById === "asc" ? "오름" : "내림"}
      </PokedexSortButton>

      <PokedexSortButton
        onClick={() => sortToggle("name")}
        selected={sortBy === "name"}
      >
        이름순 {sortByName === "asc" ? "오름" : "내림"}
      </PokedexSortButton>

      <PokedexSortButton
        onClick={() => sortToggle("type")}
        selected={sortBy === "type"}
      >
        타입순 {sortByType === "asc" ? "오름" : "내림"}
      </PokedexSortButton>

      <PokedexSortButton onClick={sortReset}>리셋</PokedexSortButton>

      <PokedexSortButton
        onClick={() => setShowBookmarks(!showBookmarks)}
        selected={showBookmarks}
      >
        {showBookmarks ? "북마크 보기 중" : "북마크만 보기"}
      </PokedexSortButton>
    </div>
  );
}
