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
};

export const useMipStore = create<Store>()((set) => ({
  createMip: false,
  mipList: [],
  openCreateDialog: () => set(() => ({ createMip: true })),
  closeCreateDialog: () => set(() => ({ createMip: false })),
  addMip: (newMip: MipSchemaType) =>
    set((state) => ({ mipList: [...state.mipList, newMip] })),
  setMipList: (mips: Store["mipList"]) =>
    set(() => {
      saveToLocalStorage(LOCAL_STORAGE_KEYS.mips, JSON.stringify(mips));
      return { mipList: mips };
    }),
}));
