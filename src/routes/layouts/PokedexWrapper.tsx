// PokedexWrapper.tsx
import { useState } from "react";
import PokedexGrid from "../../components/Pokedex/PokedexGrid";
import PokedexButtonBox from "../../components/Pokedex/PokedexButtonBox";
import { Outlet } from "react-router";

export default function PokedexWrapper() {
  const [showBookmarks, setShowBookmarks] = useState(false);

  return (
    <section className='bg-yellow-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-md flex flex-col gap-4 h-3/4 w-1/2'>
      <h1 className='text-2xl text-center'>포켓몬 도감</h1>

      <PokedexButtonBox
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
      />

      <PokedexGrid showBookmarks={showBookmarks} />

      <Outlet />
    </section>
  );
}
