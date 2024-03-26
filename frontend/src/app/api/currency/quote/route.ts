import { NYSE_DUMMY_DATA } from "@/lib/nyse.lib";
import { NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req?.nextUrl?.searchParams;
    const symbols = searchParams.get("symbols")?.split?.(",");
    if (!symbols?.length)
      return Response.json({ status: 400, message: "Invalid Input" });
    const fields = ["regularMarketPrice", "regularMarketTime"];
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
  }
}
