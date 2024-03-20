import { parseSchema } from "@/lib/utils/parser";
import { ZodType } from "zod";

export const getFromLocalStorage = (
  key: string,
  options?: { schema?: ZodType }
) => {
  const localData = JSON.parse(localStorage.getItem(key)!);
  if (!localData) return null;
  if (!options?.schema) return localData;
  return parseSchema(options.schema, localData);
};

export const saveToLocalStorage = (key: string, data: string) => {
  return localStorage.setItem(key, data);
};
