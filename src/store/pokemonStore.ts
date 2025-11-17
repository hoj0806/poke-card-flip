import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { axiosInstance } from "../api/axios";
import axios from "axios";

type Sort = "asc" | "desc";

interface PokemonStore {
  pokemons: PokemonData[];
  fetchPokemonData: () => Promise<void>;
  sortById: Sort;
  sortByName: Sort;
  sortByType: Sort;
  sortBy: "none" | "id" | "name" | "type";
  sortToggle: (key: "id" | "name" | "type") => void;
  sortReset: () => void;
}

export const usePokemonStore = create(
  immer<PokemonStore>((set, get) => ({
    pokemons: [],
    sortById: "asc",
    sortByName: "asc",
    sortByType: "asc",
    sortBy: "none",

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
      set((state) => {
        state.pokemons = results;
      });
    },

    sortToggle: (key) => {
      const state = get();
      let next: Sort;

      switch (key) {
        case "id":
          next = state.sortById === "asc" ? "desc" : "asc";
          set((s) => {
            s.pokemons.sort((a, b) =>
              next === "asc" ? a.id - b.id : b.id - a.id
            );
            s.sortById = next;
            s.sortBy = "id";
          });
          break;

        case "name":
          next = state.sortByName === "asc" ? "desc" : "asc";
          set((s) => {
            s.pokemons.sort((a, b) =>
              next === "asc"
                ? a.name.localeCompare(b.name, "ko")
                : b.name.localeCompare(a.name, "ko")
            );
            s.sortByName = next;
            s.sortBy = "name";
          });
          break;

        case "type":
          next = state.sortByType === "asc" ? "desc" : "asc";
          set((s) => {
            s.pokemons.sort((a, b) => {
              const aType = a.types[0] || "";
              const bType = b.types[0] || "";
              if (aType === bType) return a.id - b.id;
              return next === "asc"
                ? aType.localeCompare(bType, "ko")
                : bType.localeCompare(aType, "ko");
            });
            s.sortByType = next;
            s.sortBy = "type";
          });
          break;
      }
    },

    sortReset: () => {
      const { sortById, sortByName, sortByType, sortBy } = get();

      if (
        sortBy === "none" &&
        sortById === "asc" &&
        sortByName === "asc" &&
        sortByType === "asc"
      ) {
        return;
      }

      set((s) => {
        s.pokemons.sort((a, b) => a.id - b.id);
        s.sortById = "asc";
        s.sortByName = "asc";
        s.sortByType = "asc";
        s.sortBy = "none";
      });
    },
  }))
);
