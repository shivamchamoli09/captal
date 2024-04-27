import { ZodSchema } from "zod";

export const parseSchema = <T>(schema: ZodSchema, data: T): T => {
  const parser = schema.safeParse(data);
  if (!parser.success) {
    throw new Error("Invalid data provided! " + parser.error);
  }
  return parser.data;
};

export const convertToInternationalCurrencySystem = (
  labelValue: number
): number | string => {
  if (!labelValue) return "";
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Number((Math.abs(Number(labelValue)) / 1.0e9).toFixed(2)).toLocaleString() + " B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Number((Math.abs(Number(labelValue)) / 1.0e6).toFixed(2)).toLocaleString() + " M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Number((Math.abs(Number(labelValue)) / 1.0e3).toFixed(2)).toLocaleString() + " K"
    : Number(Math.abs(Number(labelValue))).toLocaleString();
};
