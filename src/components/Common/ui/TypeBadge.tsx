import { getGradientByElement } from "../../../lib/utils";

export default function TypeBadge({ type }: { type: PokemonElement }) {
  return (
    <>
      <span
        className={`
                         px-2 py-1 rounded-md text-xs md:text-sm text-white
                         bg-linear-to-br ${getGradientByElement(
                           type as PokemonElement
                         )}
                       `}
      >
        {type}
      </span>
    </>
  );
}
