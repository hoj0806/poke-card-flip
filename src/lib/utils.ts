// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PokemonElement } from "../types/Pokemon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ELEMENT_GRADIENT_MAP: Record<PokemonElement, string> = {
  풀: "from-green-400 to-green-600",
  독: "from-purple-500 to-purple-700",
  불꽃: "from-red-400 to-red-600",
  비행: "from-sky-300 to-sky-500",
  물: "from-blue-400 to-blue-600",
  벌레: "from-lime-400 to-lime-600",
  노말: "from-gray-300 to-gray-500",
  전기: "from-yellow-300 to-yellow-500",
  땅: "from-amber-600 to-yellow-700",
  페어리: "from-pink-300 to-pink-500",
  격투: "from-orange-500 to-orange-700",
  에스퍼: "from-pink-500 to-purple-600",
  바위: "from-stone-400 to-stone-600",
  강철: "from-slate-400 to-slate-600",
  얼음: "from-cyan-300 to-cyan-500",
  고스트: "from-indigo-500 to-indigo-700",
  드래곤: "from-indigo-400 to-purple-600",
};

export function getGradientByElement(type: PokemonElement): string {
  return ELEMENT_GRADIENT_MAP[type];
}
