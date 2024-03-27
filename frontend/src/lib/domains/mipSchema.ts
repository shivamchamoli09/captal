import { z } from "zod";
import { CryptoSchema } from "./cryptoSchema";

export const MipSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(1),
  currencies: z.array(CryptoSchema),
  createdDate: z.string().nullish(),
});

export type MipSchemaType = z.infer<typeof MipSchema>;
