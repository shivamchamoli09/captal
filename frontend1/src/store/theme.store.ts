import { create } from "zustand";

type Store = {
  mode: "light" | "dark";
  setMode: (mode: Store["mode"]) => void;
};

export const useThemeStore = create<Store>()((set) => ({
  mode: "dark",
  setMode: (mode: Store["mode"]) => set(() => ({ mode })),
}));
