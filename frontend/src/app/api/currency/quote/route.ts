import { NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const symbols = searchParams.get("symbols")?.split?.(",");
    if (!symbols?.length)
      return Response.json({ status: 400, message: "Invalid Input" });
    const fields = [
      "regularMarketPrice",
      "regularMarketChangePercent",
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
    return Response.json(result);
  } catch (error) {
    console.log("error: ", error);
    if (isDynamicServerError(error)) {
      throw error;
    }
    return Response.json([]);
  }
}
