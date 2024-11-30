import {
  EstimatedPricesSchema,
  EstimatedPricesSchemaType,
} from "../domains/estimatedPrices";
import { parseSchema } from "../utils/parser";
import axios from "axios";

export const getTomorrowEstimations =
  async (): Promise<EstimatedPricesSchemaType> => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/currency/estimates`
      );
      return parseSchema(EstimatedPricesSchema, res?.data?.estimates);
    } catch (error) {
      console.log(error);
      return [];
    }
  };
