import { create } from "zustand";
import { persist } from "zustand/middleware";

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
