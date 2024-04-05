import { ZodSchema } from "zod";

export const parseSchema = <T>(schema: ZodSchema, data: T): T => {
  const parser = schema.safeParse(data);
  if (!parser.success) {
    throw new Error("Invalid data provided! " + parser.error);
  }
  return parser.data;
};
