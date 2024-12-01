from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

# Scopes for Google Sheets
SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
]

private_key = ""

CREDENTIALS_INFO = {}

SHEET_ID = ""  # Replace with your actual sheet ID

# Authenticate using minimal credentials


def write_to_google_sheet(range_, data):
    try:
        print("Writing to google sheet")
        # Authenticate using minimal credentials
        credentials = Credentials.from_service_account_info(CREDENTIALS_INFO, scopes=SCOPES)

        # Create the Sheets API client
        service = build("sheets", "v4", credentials=credentials)

        # Write data to the Google Sheet
        sheet = service.spreadsheets()
        print(sheet.values())
        body = {"values": data}
        sheet.values().clear(spreadsheetId=SHEET_ID, range=range_).execute()
        result = sheet.values().update(
            spreadsheetId=SHEET_ID,
            range=range_,
            valueInputOption="RAW",  # or "USER_ENTERED" for interpreted input
            body=body,
        ).execute()

        return result
    except Exception as e:
        raise RuntimeError(f"Failed to write data to Google Sheet: {e}")
