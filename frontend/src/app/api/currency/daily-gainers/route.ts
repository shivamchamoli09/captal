import yahooFinance from "yahoo-finance2";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function GET() {
  try {
    const queryOptions = {
      count: 6,
      region: "US",
      lang: "en-US",
    };
    const result = await yahooFinance.dailyGainers(queryOptions, {
      validateResult: false,
    });
    return Response.json(result?.quotes);
  } catch (error) {
    console.log("error: ", error);
    if (isDynamicServerError(error)) {
      throw error;
    }
    return Response.json([]);
  }
}

export const revalidate = 0;
