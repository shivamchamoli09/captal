import yahooFinance from "yahoo-finance2";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function GET() {
  try {
    const result = await yahooFinance.screener(
      {
        scrIds: "most_actives",
        count: 250,
        region: "US",
        lang: "en-US",
      },
      { validateResult: false  }
    );
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
