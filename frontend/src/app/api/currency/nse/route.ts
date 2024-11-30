import yahooFinance from "yahoo-finance2";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NSE_SYMBOLS } from "@/lib/symbols/nse";
import { CurrencySchemaType } from "@/lib/domains";
import { convertToUSD } from "../../services/currency-converter";

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
        await yahooFinance.quoteCombine(q, {}, { validateResult: false })
      );
    }
    return result;
  } catch (error) {
    return [];
  }
}

export async function GET() {
  try {
    let pairs = [];
    let currPair: string[] = [];
    for (let i = 0; i < NSE_SYMBOLS.length; i++) {
      if (i === 0 || i % 25 !== 0) {
        currPair.push(NSE_SYMBOLS[i]);
        if (i === NSE_SYMBOLS.length - 1) pairs.push(currPair);
      } else {
        pairs.push(currPair);
        currPair = [NSE_SYMBOLS[i]];
      }
    }
    const promises = [];
    for (const pair of pairs) {
      promises.push(getQuotes(pair));
    }
    let data = await Promise.all(promises);
    const result: CurrencySchemaType[] = [];
    data.forEach((res) => {
      result.push(...res);
    });
    const formatted = await convertToUSD(result);
    return Response.json(formatted);
  } catch (error) {
    console.log("error: ", error);
    if (isDynamicServerError(error)) {
      throw error;
    }
    return Response.json([]);
  }
}


export const revalidate = 0;
