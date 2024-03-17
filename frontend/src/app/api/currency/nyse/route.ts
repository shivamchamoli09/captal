import { NYSE_DUMMY_DATA } from "@/lib/nyse.lib";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return Response.json({ data: NYSE_DUMMY_DATA });
}
