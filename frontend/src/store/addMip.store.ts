import { create } from "zustand";

type Store = {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export const useAddMipStore = create<Store>()((set) => ({
  open: false,
  openDialog: () => set(() => ({ open: true })),
  closeDialog: () => set(() => ({ open: false })),
}));
