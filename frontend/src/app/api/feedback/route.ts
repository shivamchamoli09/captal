import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await (req as any).json();
    const { name, email, feedback } = body;
    if (!feedback)
      return new Response(
        JSON.stringify({ status: false, message: "Feedback is required." }),
        { status: 400 }
      );

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
    const sheets = google.sheets({
      auth,
      version: "v4",
    });
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A2:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, name, feedback]],
      },
    });
    return Response.json({ message: "Feedback successfully saved!" });
  } catch (error) {
    console.log("error: ", error);
    return [];
  }
}
