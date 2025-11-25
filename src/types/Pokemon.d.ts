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

type PokemonElement =
  | "풀"
  | "독"
  | "불꽃"
  | "비행"
  | "물"
  | "벌레"
  | "노말"
  | "전기"
  | "땅"
  | "페어리"
  | "격투"
  | "에스퍼"
  | "바위"
  | "강철"
  | "얼음"
  | "고스트"
  | "드래곤";
interface PokemonData {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: PokemonElement[];
  abilities: string[];
  bookmark: boolean;
}
