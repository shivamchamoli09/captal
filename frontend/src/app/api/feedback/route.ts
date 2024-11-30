import { NextRequest } from "next/server";
import { google } from "googleapis";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function POST(req: NextRequest) {
  const body = await (req as any).json();
  try {
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
    await sheets.spreadsheets.values.append({
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
