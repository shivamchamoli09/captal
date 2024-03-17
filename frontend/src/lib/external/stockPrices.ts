import { z } from "zod";
import { CryptoSchema } from "../domains/cryptoSchema";
import { parseSchema } from "../utils/parser";

export const GetCurrencyPricesSchema = z.object({
  crypto: z.array(CryptoSchema),
});

export const getCurrencyPrices = async (): Promise<
  z.infer<typeof GetCurrencyPricesSchema>
> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/currency/crypto`);
  const data = await res.json();
  return parseSchema(GetCurrencyPricesSchema, data);
};
