import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ColorThemeStore {
  colorTheme: "light" | "dark" | "system";
  updateColorTheme: (theme: "light" | "dark" | "system") => void;
}

export const useColorThemeStore = create<ColorThemeStore>()(
  persist(
    (set) => ({
      colorTheme: "system",
      updateColorTheme: (theme) => {
        set({ colorTheme: theme });
      },
    }),
    {
      name: "color-theme",
    }
  )
);
