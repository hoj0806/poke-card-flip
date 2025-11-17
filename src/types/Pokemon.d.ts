interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Language {
  name: string;
  url: string;
}

interface NameByLanguage {
  language: Language;
  name: string;
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonData {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
}
