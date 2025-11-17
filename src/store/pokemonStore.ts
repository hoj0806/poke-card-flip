import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import axios from "axios";

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  fetchPokemonData: async () => {
    const pokemonPromises = Array.from({ length: 151 }, (_, i) => i + 1).map(
      async (id) => {
        const {
          data: {
            id: pokemonId,
            sprites: { front_default },
            height,
            weight,
            types,
            abilities,
          },
        } = await axiosInstance.get(`/pokemon/${id}/`);

        const {
          data: { names },
        } = await axiosInstance.get(`/pokemon-species/${id}/`);

        const koreanName = names.find(
          (name: NameByLanguage) => name.language.name === "ko"
        )?.name;

        const koreanTypes = await Promise.all(
          types.map(async (type: PokemonType) => {
            const {
              data: { names },
            } = await axios.get(type.type.url);
            return names.find(
              (name: NameByLanguage) => name.language.name === "ko"
            )?.name;
          })
        );

        const koreanAbilities = await Promise.all(
          abilities.map(async (ability: PokemonAbility) => {
            const {
              data: { names },
            } = await axios.get(ability.ability.url);
            return names.find(
              (name: NameByLanguage) => name.language.name === "ko"
            )?.name;
          })
        );

        return {
          id: pokemonId,
          name: koreanName,
          image: front_default,
          height,
          weight,
          types: koreanTypes,
          abilities: koreanAbilities,
        };
      }
    );

    const results = await Promise.all(pokemonPromises);
    set({ pokemons: results });
  },
}));
