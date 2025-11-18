import { useParams } from "react-router";
import { usePokemonStore } from "../../../store/pokemonStore";
import { useState, useEffect } from "react";
import Card from "../../../components/Game/Card";

interface PokemonCard {
  id: string;
  name: string;
  image: string;
  isFlied: boolean; // 뒤집힘 상태
  isCorrect: boolean; // 맞춘 카드 여부
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
        isCorrect: false,
      },
      {
        id: `${p.id}-2`,
        name: p.name,
        image: p.image,
        isFlied: true, // 최초 뒤집힘
        isCorrect: false,
      },
    ]);

    return cards.sort(() => Math.random() - 0.5);
  });

  // 뒤집힌 카드 추적
  const [flippedCards, setFlippedCards] = useState<PokemonCard[]>([]);

  const handleFlip = (card: PokemonCard) => {
    // 이미 2개 뒤집혀 있으면 막기
    if (flippedCards.length >= 2) return;

    // 이미 앞면이거나 맞춘 카드면 막기
    if (!card.isFlied || card.isCorrect) return;

    // 카드 뒤집기
    setPokemonCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlied: false } : c))
    );

    // flippedCards에 추가
    setFlippedCards((prev) => [...prev, { ...card, isFlied: false }]);
  };

  // 뒤집힌 카드가 2장 되면 비교
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      setTimeout(() => {
        setPokemonCards((prev) =>
          prev.map((c) => {
            if (c.id === first.id || c.id === second.id) {
              if (first.name === second.name) {
                return { ...c, isCorrect: true };
              } else {
                return { ...c, isFlied: true };
              }
            }
            return c;
          })
        );

        // 비교 후 flippedCards 초기화
        setFlippedCards([]);
      }, 500);
    }
  }, [flippedCards]);

  return (
    <>
      <h2 className='text-2xl font-bold mb-6 text-center'>{difficulty}</h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-items-center'>
        {pokemonCards.map((card) => (
          <Card
            key={card.id}
            size='w-28 h-36'
            isFlied={card.isFlied}
            isCorrect={card.isCorrect}
            onFlip={() => handleFlip(card)}
            frontContent={
              <>
                <img
                  src={card.image}
                  alt={card.name}
                  className='w-16 h-16 object-contain'
                />
                <div className='mt-1 font-medium text-sm text-center'>
                  {card.name}
                </div>
              </>
            }
            backContent={
              <div className='bg-blue-500 w-full h-full rounded-lg' />
            }
          />
        ))}
      </div>
    </>
  );
}
