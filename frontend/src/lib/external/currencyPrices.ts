import { z } from "zod";
import { parseSchema } from "../utils/parser";
import { YAHOO_COOKIES } from "../constants/yahooCookies.const";
import { StockSchema } from "../domains/stockSchema";
import { CryptoSchema } from "../domains/cryptoSchema";
import { CurrencyListSchema, CurrencySchema } from "../domains";
import axios from "axios";

export const GetStockPricesSchema = z.array(StockSchema);
export const GetCryptoPricesSchema = z.array(CryptoSchema);

// https://api.binance.com/api/v3/ticker/24hr

export const getStockPrices = async (): Promise<
  z.infer<typeof GetStockPricesSchema>
> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/currency/nyse`
    );
    return parseSchema(GetStockPricesSchema, res?.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getNSEStockPrices = async (): Promise<
  z.infer<typeof GetStockPricesSchema>
> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/currency/nse`
    );
    return parseSchema(GetStockPricesSchema, res?.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCryptoPrices = async (): Promise<
  z.infer<typeof GetCryptoPricesSchema>
> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/currency/crypto`
    );
    return parseSchema(GetCryptoPricesSchema, res?.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCurrencies = async (): Promise<{
  stocks: z.infer<typeof GetStockPricesSchema>;
  crypto: z.infer<typeof GetCryptoPricesSchema>;
  nse: z.infer<typeof GetStockPricesSchema>;
}> => {
  const stocksPromise = getStockPrices();
  const cryptoPromise = getCryptoPrices();
  const nsePricesPromise = getNSEStockPrices();
  const result = await Promise.all([
    stocksPromise,
    cryptoPromise,
    nsePricesPromise,
  ]);
  return {
    stocks: result[0],
    crypto: result[1],
    nse: result[2],
  };
};

export const getQuotes = async ({ symbols }: { symbols: string }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/currency/quote?symbols=${symbols}`
  );
  return res?.data;
};

export const getDailyGainers = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/currency/daily-gainers`
  );
  return parseSchema(CurrencyListSchema, res?.data);
};
