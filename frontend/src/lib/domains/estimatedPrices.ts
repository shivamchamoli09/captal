import { z } from "zod";

export const EstimatedPriceSchema = z.object({
    assetName: z.string(),
    currentDate: z.string(),
    currentPrice: z.string(),
    estimatedDate: z.string(),
    estimatedPrice: z.string(),
});

export const EstimatedPricesSchema = z.array(EstimatedPriceSchema);

export type EstimatedPriceSchemaType = z.infer<typeof EstimatedPriceSchema>;
export type EstimatedPricesSchemaType = z.infer<typeof EstimatedPricesSchema>;
