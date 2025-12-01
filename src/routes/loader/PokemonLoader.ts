import { AxiosError } from "axios";
import { usePokemonStore } from "../../store/pokemonStore";

export const pokemonLoader = async () => {
  const store = usePokemonStore.getState();

  if (store.pokemons.length > 0) {
    return store.pokemons;
  }

  try {
    await store.fetchPokemonData();
    return store.pokemons;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const status = err.response?.status ?? 500;
      const message =
        err.response?.data?.message ?? err.message ?? "알 수 없는 오류";
      throw new Response(JSON.stringify({ message }), {
        status,
        statusText: err.response?.statusText ?? "Error",
      });
    }

    const message =
      err instanceof Error
        ? err.message
        : "포켓몬 데이터를 불러오지 못했습니다.";
    throw new Response(JSON.stringify({ message }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
