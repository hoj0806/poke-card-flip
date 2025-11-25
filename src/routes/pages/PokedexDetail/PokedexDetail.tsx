import { Navigate, useNavigate, useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { getGradientByElement } from "../../../lib/utils";
import type { PokemonElement } from "../../../types/Pokemon";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PokedexDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemons = usePokemonStore((state) => state.pokemons);
  const toggleBookmark = usePokemonStore(
    (state) => state.toggleBookMarkPokemon
  );

  const pokemon = pokemons.find((p) => p.id === Number(id));

  if (!pokemon) {
    return <Navigate to='/404' replace />;
  }

  const height = (pokemon.height / 10).toFixed(1);
  const weight = (pokemon.weight / 10).toFixed(1);

  const firstType = pokemon.types[0] as PokemonElement;

  return (
    <AnimatePresence>
      <motion.div
        key={pokemon.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='fixed inset-0 flex justify-center items-center z-50 p-4'
        onClick={() => navigate("/pokedex")}
      >
        <motion.div
          whileHover={{
            boxShadow: "0px 15px 35px rgba(255, 215, 0, 0.5)",
          }}
          className={`
            cursor-pointer
            w-full max-w-[400px] aspect-2/3
            font-bold p-4 text-[#181a1a] rounded-lg
            relative
            bg-linear-to-br ${getGradientByElement(firstType)}
            shadow-lg shadow-black/30
            border-2 border-transparent
            transition-all duration-300
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex items-center justify-between'>
            <div className='relative w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-black'>
              <div className='absolute top-0 left-0 w-full h-1/2 bg-red-500' />
              <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-1/3 h-1/3 bg-white border-2 border-black rounded-full' />
              </div>
            </div>

            <p className='text-sm md:text-lg font-bold text-white bg-gray-800 px-4 py-1 rounded-lg shadow-lg'>
              No.
              <span className='bg-linear-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-md'>
                {String(pokemon.id).padStart(3, "0")}
              </span>
            </p>
          </div>

          <div className='w-full mt-3 aspect-square flex justify-center items-center overflow-hidden'>
            <img
              alt={pokemon.name}
              src={pokemon.image}
              className='w-full h-full object-contain -mt-1.5'
            />
          </div>

          <div className='absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] bg-white/20 backdrop-blur-md rounded-lg p-4 shadow-md border border-yellow-400 text-sm md:text-base'>
            <button
              onClick={() => toggleBookmark(pokemon.id)}
              className='absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center'
            >
              {pokemon.bookmark ? (
                <Heart className='text-pink-500 w-6 h-6 md:w-8 md:h-8 fill-pink-500 cursor-pointer' />
              ) : (
                <Heart className='text-white w-6 h-6 md:w-8 md:h-8 cursor-pointer' />
              )}
            </button>

            <div className='flex gap-4 mt-1 text-white'>
              <div className='flex items-center gap-2'>
                <span>키</span>
                <span className='font-semibold'>{height}m</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>무게</span>
                <span className='font-semibold'>{weight}kg</span>
              </div>
            </div>

            <p className='mt-2 text-white text-lg md:text-xl font-bold'>
              이름 : {pokemon.name}
            </p>

            <div className='flex gap-2 flex-wrap mt-2'>
              <span>특성 :</span>
              {pokemon.abilities.map((ability: string) => (
                <span
                  key={ability}
                  className='bg-yellow-500/30 px-2 py-1 rounded-md text-xs md:text-sm text-white'
                >
                  {ability}
                </span>
              ))}
            </div>

            <div className='flex gap-2 flex-wrap mt-2'>
              <span>타입 :</span>
              {pokemon.types.map((type: PokemonElement) => (
                <span
                  key={type}
                  className={`
                    px-2 py-1 rounded-md text-xs md:text-sm text-white
                    bg-linear-to-br ${getGradientByElement(
                      type as PokemonElement
                    )}
                  `}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
