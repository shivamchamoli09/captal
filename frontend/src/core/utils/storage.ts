import { parseSchema } from "@/lib/utils/parser";
import { ZodType } from "zod";
import * as CryptoJS from "crypto-js";

export const encryptMessage = (message: string) => {
  return CryptoJS.AES.encrypt(
    message,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
  ).toString();
};

export const decryptMessage = (ciphertext: string) => {
  let bytes = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getFromLocalStorage = (
  key: string,
  options?: { schema?: ZodType }
) => {
  let localData = localStorage.getItem(key)!;
  if (!localData) return null;
  localData = JSON.parse(decryptMessage(localData));
  if (!options?.schema) return localData;
  return parseSchema(options.schema, localData);
};

export const saveToLocalStorage = (key: string, data: string) => {
  const encrypted = encryptMessage(data);
  return localStorage.setItem(key, encrypted);
};
