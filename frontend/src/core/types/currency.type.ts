import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";

export const CurrencyTypes = {
  CRYPTO: "CRYPTO",
  NYSE: "NYSE",
  // NSE: "NSE",
} as const;

export interface ILatestCurrency extends CryptoSchemaType {
  latestRegularMarketPrice: number;
}
