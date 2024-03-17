import z from "zod";

export const CryptoSchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string().nullable(),
    image: z.string().nullable(),
    current_price: z.number(),
    market_cap: z.number(),
    market_cap_rank: z.number(),
    fully_diluted_valuation: z.number().nullable(),
    total_volume: z.number(),
    high_24h: z.number().nullable(),
    low_24h: z.number().nullable(),
    price_change_24h: z.number().nullable(),
    price_change_percentage_24h: z.number().nullable(),
    market_cap_change_24h: z.number().nullable(),
    market_cap_change_percentage_24h: z.number().nullable(),
    circulating_supply: z.number().nullable(),
    total_supply: z.number().nullable(),
    max_supply: z.number().nullable(),
    ath: z.number().nullable(),
    ath_change_percentage: z.number().nullable(),
    ath_date: z.string().nullable(),
    atl: z.number().nullable(),
    atl_change_percentage: z.number().nullable(),
    atl_date: z.string().nullable(),
    roi: z
      .object({
        times: z.number().nullable(),
        currency: z.string().nullable(),
        percentage: z.number().nullable(),
      })
      .nullable(),
    last_updated: z.string().nullable(),
  });

export type CryptoSchemaType = z.infer<typeof CryptoSchema>;
