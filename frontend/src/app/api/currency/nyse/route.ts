import { NYSE_DUMMY_DATA } from "@/lib/nyse.lib";
import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await yahooFinance.screener(
      {
        scrIds: "most_actives",
        count: 250,
        region: "US",
        lang: "en-US",
      },
      { validateResult: false }
    );
    return Response.json(result?.quotes);
  } catch (error) {
    console.log("error: ", error);
  }
}
