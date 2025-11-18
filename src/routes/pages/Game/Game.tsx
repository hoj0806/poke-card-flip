import { useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { useState } from "react";
import Card from "../../../components/Game/Card";

interface PokemonCard {
  id: string;
  name: string;
  image: string;
  isFlied: boolean; // 뒤집힘 상태
}

export default function Game() {
  const { difficulty } = useParams();
  const pokemons = usePokemonStore((state) => state.pokemons);

  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>(() => {
    if (!pokemons || pokemons.length === 0) return [];

    let cardCount = 6; // easy
    if (difficulty === "normal") cardCount = 10;
    else if (difficulty === "hard") cardCount = 15;

    const selectedPokemons = [...pokemons]
      .sort(() => Math.random() - 0.5)
      .slice(0, cardCount);

    const cards = selectedPokemons.flatMap((p) => [
      {
        id: `${p.id}-1`,
        name: p.name,
        image: p.image,
        isFlied: true, // 최초 뒤집힘
      },
      {
        id: `${p.id}-2`,
        name: p.name,
        image: p.image,
        isFlied: false,
      },
    ]);

    return cards.sort(() => Math.random() - 0.5);
  });

  // 카드 클릭 핸들러
  const handleFlip = (id: string) => {
    setPokemonCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFlied: !card.isFlied } : card
      )
    );
  };

  return (
    <>
      <h2 className='text-2xl font-bold mb-6 text-center'>{difficulty}</h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-items-center'>
        {pokemonCards.map((card) => (
          <Card
            key={card.id}
            size='w-32 h-40'
            isFlied={card.isFlied}
            onFlip={() => handleFlip(card.id)}
            frontContent={
              <>
                <img
                  src={card.image}
                  alt={card.name}
                  className='w-20 h-20 object-contain'
                />
                <div className='mt-1 font-medium text-sm text-center'>
                  {card.name}
                </div>
              </>
            }
            backContent={<div />} // 단색 배경
          />
        ))}
      </div>
    </>
  );
}
