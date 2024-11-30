import {
    EstimatedPricesSchema,
    EstimatedPricesSchemaType,
} from "../domains/estimatedPrices";
import { parseSchema } from "../utils/parser";

export const getTomorrowEstimations =
    async (): Promise<EstimatedPricesSchemaType> => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/currency/estimates`,
                { cache: "no-store" }
            );
            const data = await res.json();
            return parseSchema(EstimatedPricesSchema, data?.estimates);
        } catch (error) {
            console.log(error);
            return [];
        }
    };
