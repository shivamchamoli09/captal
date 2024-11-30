import { google } from "googleapis";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: process.env.PRIVATE_KEY?.replace?.(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    const sheetId = "134YHKyeHtH74vEv9pmqQlfFMKaddteIrTdDvMADOz40";
    const sheets = google.sheets({
      auth,
      version: "v4",
    });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A2:Z",
    });
    const rows = response?.data?.values;
    const estimates: {
      assetName: string;
      currentDate: string;
      currentPrice: string;
      estimatedDate: string;
      estimatedPrice: string;
    }[] = [];
    if (rows?.length) {
      rows.forEach((row) => {
        estimates.push({
          assetName: row[0],
          currentDate: row[1],
          currentPrice: row[2],
          estimatedDate: row[3],
          estimatedPrice: row[4],
        });
      });
    } else {
      console.log("No data found.");
    }
    return Response.json({ estimates });
  } catch (error) {
    console.log("error: ", error);
    if (isDynamicServerError(error)) {
      throw error;
    }
    return new Response(
      JSON.stringify({ status: false, message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}

export const revalidate = 0;
