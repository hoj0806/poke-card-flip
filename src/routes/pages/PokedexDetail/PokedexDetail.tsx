import { useNavigate, useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";

export default function PokedexDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemons = usePokemonStore((state) => state.pokemons);

  const pokemon = pokemons.find((p) => p.id === Number(id));

  if (!pokemon) return null;

  return (
    <div
      className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'
      onClick={() => navigate("/pokedex")}
    >
      <div
        className='bg-white p-6 rounded-xl shadow-xl w-[400px]'
        onClick={(e) => e.stopPropagation()} // 모달 안 클릭 시 닫히지 않도록
      >
        <button
          className='absolute top-4 right-4 text-gray-600'
          onClick={() => navigate("/pokedex")}
        >
          ✕
        </button>

        <h1 className='text-2xl font-bold mb-4 text-center'>{pokemon.name}</h1>

        <img
          src={pokemon.image}
          className='w-40 h-40 mx-auto mb-4'
          alt={pokemon.name}
        />

        <p>키: {pokemon.height}</p>
        <p>몸무게: {pokemon.weight}</p>
        <p>타입: {pokemon.types.join(", ")}</p>
        <p>특성: {pokemon.abilities.join(", ")}</p>
      </div>
    </div>
  );
}
