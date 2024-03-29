import { NYSE_DUMMY_DATA } from "@/lib/nyse.lib";
import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const queryOptions = {
      count: 5,
      region: "US",
      lang: "en-US",
    };
    const result = await yahooFinance.dailyGainers(queryOptions, {
      validateResult: false,
    });
    return Response.json(result?.quotes);
  } catch (error) {
    console.log("error: ", error);
  }
}
