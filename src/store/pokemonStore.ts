import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../api/axios";
import axios from "axios";

export const usePokemonStore = create(
  persist(
    immer<PokemonStore>((set, get) => ({
      highScore: {
        easy: [],
        normal: [
          { name: "테스트1", score: 3 },
          { name: "테스트2", score: 2 },
          { name: "테스트3", score: 1 },
        ],
        hard: [
          { name: "테스트1", score: 3 },
          { name: "테스트2", score: 2 },
          { name: "테스트3", score: 1 },
        ],
      },

      setHighScore: (
        difficulty: "easy" | "normal" | "hard",
        name: string,
        score: number
      ) => {
        set((state) => {
          const currentScores = state.highScore[difficulty];
          const updatedScores = [...currentScores, { name, score }];
          updatedScores.sort((a, b) => b.score - a.score);
          state.highScore[difficulty] = updatedScores.slice(0, 3);
        });
      },

      pokemons: [],
      sortById: "asc",
      sortByName: "asc",
      sortByType: "asc",
      sortBy: "none",

      toggleBookMarkPokemon: (id: number) => {
        set((state) => {
          const pokemon = state.pokemons.find((p) => p.id === id);
          if (pokemon) {
            pokemon.bookmark = !pokemon.bookmark;
          }
        });
      },

      fetchPokemonData: async () => {
        const pokemonPromises = Array.from(
          { length: 151 },
          (_, i) => i + 1
        ).map(async (id) => {
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
              const { data } = await axios.get(type.type.url);
              return data.names.find(
                (name: NameByLanguage) => name.language.name === "ko"
              )?.name;
            })
          );

          const koreanAbilities = await Promise.all(
            abilities.map(async (ability: PokemonAbility) => {
              const { data } = await axios.get(ability.ability.url);
              return data.names.find(
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
            bookmark: false,
          };
        });

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
            next =
              state.sortBy !== "id"
                ? "asc"
                : state.sortById === "asc"
                ? "desc"
                : "asc";
            set((s) => {
              s.pokemons.sort((a, b) =>
                next === "asc" ? a.id - b.id : b.id - a.id
              );
              s.sortById = next;
              s.sortBy = "id";
            });
            break;

          case "name":
            next =
              state.sortBy !== "name"
                ? "asc"
                : state.sortByName === "asc"
                ? "desc"
                : "asc";
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
            next =
              state.sortBy !== "type"
                ? "asc"
                : state.sortByType === "asc"
                ? "desc"
                : "asc";
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
    })),
    {
      name: "pokemon-store",
      partialize: (state) => ({
        highScore: state.highScore,
        pokemons: state.pokemons,
        sortBy: state.sortBy,
        sortById: state.sortById,
        sortByName: state.sortByName,
        sortByType: state.sortByType,
      }),
    }
  )
);
