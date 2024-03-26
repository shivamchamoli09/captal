import { CurrencyListSchemaType } from "@/lib/domains";
import { create } from "zustand";

type Store = {
  currencies: CurrencyListSchemaType;
  setCurrencies: (val: CurrencyListSchemaType) => void;
};

export const useCurrencyStore = create<Store>()((set) => ({
  currencies: [],
  setCurrencies: (currencies: Store["currencies"]) =>
    set(() => ({ currencies })),
}));
