import { CRYPTO_DUMMY_DATA } from "@/lib/crypto.lib";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return Response.json({ crypto: CRYPTO_DUMMY_DATA });
}

