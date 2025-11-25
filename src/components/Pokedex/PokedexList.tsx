import { Link } from "react-router";
import { motion } from "framer-motion";
import type { PokemonData } from "../../types/Pokemon";

export default function PokedexList({ name, image, id }: PokemonData) {
  return (
    <Link to={`/pokedex/${id}`}>
      <li className='cursor-pointer '>
        <div className='relative flex items-center justify-center rounded-full md:w-[120px] md:h-[120px] border-[3px] border-white/30 bg-transparent shadow-2xl overflow-hidden hover:shadow-amber-200'>
          <div className='absolute inset-0 rounded-full bg-gradient-radial from-white/50 to-transparent opacity-60'></div>
          <div className='absolute inset-0 rounded-full backdrop-blur-md bg-white/10 shadow-inner'></div>

          <motion.img
            className='relative w-[70%] h-[70%] object-contain z-20 filter brightness-110 contrast-120'
            src={image}
            alt={name}
            whileHover={{ scale: 1.2 }}
          />

          <div className='absolute top-2 left-2 w-6 h-6 bg-white/50 rounded-full blur-[5px]'></div>
          <div className='absolute bottom-1 right-1 w-4 h-4 bg-white/30 rounded-full blur-[3px]'></div>
        </div>
        <p className='text-[14px] text-center mt-2'>{name}</p>
      </li>
    </Link>
  );
}
