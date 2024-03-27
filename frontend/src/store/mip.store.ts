import { LOCAL_STORAGE_KEYS } from "@/core/const/storage.const";
import { saveToLocalStorage } from "@/core/utils/storage";
import { MipSchemaType } from "@/lib/domains/mipSchema";
import { create } from "zustand";

type Store = {
  createMip: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  mipList: Array<MipSchemaType>;
  addMip: (mip: MipSchemaType) => void;
  setMipList: (mips: Store["mipList"]) => void;
  mipCurrentBalanceById?: Map<string, number>;
  setMipCurrentBalance: (id: string, balance: number) => void;
};

export const useMipStore = create<Store>()((set) => ({
  createMip: false,
  mipList: [],
  mipCurrentBalanceById: new Map(),
  openCreateDialog: () => set(() => ({ createMip: true })),
  closeCreateDialog: () => set(() => ({ createMip: false })),
  addMip: (newMip: MipSchemaType) =>
    set((state) => ({ ...state, mipList: [...state.mipList, newMip] })),
  setMipList: (mips: Store["mipList"]) =>
    set((state) => {
      saveToLocalStorage(LOCAL_STORAGE_KEYS.mips, JSON.stringify(mips));
      return { ...state, mipList: mips };
    }),
  setMipCurrentBalance: (id: string, bal: number) =>
    set((state) => {
      state.mipCurrentBalanceById?.set(id, bal);
      return { ...state };
    }),
}));
