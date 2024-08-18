import { CurrencySchemaType } from "@/lib/domains";
import yahooFinance from "yahoo-finance2";

async function getQuotes(symbols: Array<string>) {
  try {
    const fields = [
      "regularMarketPrice",
      "regularMarketChangePercent",
      "regularMarketPreviousClose",
      "regularMarketDayHigh",
      "regularMarketDayLow",
      "regularMarketOpen",
      "shortName",
      "longName",
    ];
    let result = [];
    for (const q of symbols) {
      result.push(
        await yahooFinance.quoteCombine(
          q,
          { fields },
          { validateResult: false }
        )
      );
    }
    return result;
  } catch (error) {
    console.log("error: ", error);
    return [];
  }
}

export const convertToUSD = async (
  currencies: Array<CurrencySchemaType>
): Promise<Array<CurrencySchemaType>> => {
  const usdToInr = await getQuotes(["INR=X"]);
  const delta: number = Number(usdToInr?.[0]?.regularMarketPrice?.toFixed(3));
  const filteredCurrencies = currencies?.filter((c) => !!c?.regularMarketPrice);
  return filteredCurrencies?.map((c) => {
    return c?.currency === "USD"
      ? c
      : {
          ...c,
          currency: "USD",
          regularMarketPrice: c.regularMarketPrice / delta,
          regularMarketPreviousClose: c?.regularMarketPreviousClose
            ? c.regularMarketPreviousClose / delta
            : 0,
          marketCap: c?.marketCap ? c.marketCap / delta : 0,
          regularMarketDayHigh: c?.regularMarketDayHigh
            ? c.regularMarketDayHigh / delta
            : 0,
          regularMarketDayLow: c?.regularMarketDayLow
            ? c.regularMarketDayLow / delta
            : 0,
          regularMarketOpen: c?.regularMarketOpen
            ? c.regularMarketOpen / delta
            : 0,
        };
  });
};
