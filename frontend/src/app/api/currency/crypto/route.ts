import { CRYPTO_DUMMY_DATA } from "@/lib/crypto.lib";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    return Response.json(result);
  } catch (error) {
    console.log("error: ", error);
    return []
  }
}
