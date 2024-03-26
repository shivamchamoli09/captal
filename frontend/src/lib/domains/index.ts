import { z } from "zod";
import { StockSchema } from "./stockSchema";
import { CryptoSchema } from "./cryptoSchema";

export const CurrencySchema = z.union([StockSchema, CryptoSchema]);
export const CurrencyListSchema = z.array(CurrencySchema);

export type CurrencySchemaType = z.infer<typeof CurrencySchema>;
export type CurrencyListSchemaType = z.infer<typeof CurrencyListSchema>;
