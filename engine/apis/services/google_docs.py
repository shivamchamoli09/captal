from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

# Scopes for Google Sheets
SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
]

private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkovjTdFx5B86j\nFQvyiHGTH5uF5Cm6Q8tcEA2djUoQjGY2jt8m7WsfAXzcULNEia9uHN46p4edS5J2\nSbdYXXjdkl44nl+fIVKqgSDAfNZQA9z1SqrbeptWQfEOFeKNbdA3E3QQlEeBIFKM\nI7aoDiaYxxDcelgWYNem3fBBY0qohXKyUf2qu92/rRPcUKFkQsdYl2Liq/YMsleB\nmCLKw7jn/vGwaJHj72zo8JgFqXDapfHbV3hLU72yiZUosGtZ3fKrfmm1UvzxfwMV\nWbgCU6Wttz94cAsH27fA5dMWM3xPD91yTgNbea3JAPEFRRgu+Q1XGupvkMVTbDbJ\n6vG4bOfbAgMBAAECggEACoRYpdVglOCxTAyrozYhHzddLXvqSHpNMtfZrs9YRF9b\npi+RRMDU33muWrqTARVUjhGtBo0uJheuRv0lh7EM6AaSG0bOr/EmgTrXd0RiQmFE\ny6yV5ohaBPQYbIBsZQF3VBVbjDWUrcR9UXN0lx60S30n8BWmq+NK01+JGfw4SDSH\n5F1KCKDjgr3wV30XlLg50SBXekLd4rIcMpBIm/9r9OfLj9Bv/8Hveqkcu3TR5jfH\nPjVnY9n3kCh2NJKOpsO7fREthl8ScY7WnI0E2g8YvGHJLA3vLTaIGtfXlfvokPCJ\nLKqRK2Roq0uufrn9VKloN5uOcVEOrQ6a+GlIGa4CAQKBgQDVEOhY8QkdwFbszEWq\n5NmhAmbIXynAS0+4scm0rEMuZEaOrym5Ngugh9bK+nHIkGNRtcsXJpk+AoI3e6Ui\ncmR+qXqCye4BTmgS1BgvYXlh7MO/kXakIWwhgnXwzbSXUHzweSQ51SAbzfoflU6r\nHwC/tIrdVhVRLgh3moSTVm6R2wKBgQDFz9BJxXliP4PysWs81JpfViZLKqszjNvL\nIlP4Bfq///WhICAxDuBEj8hLxVIsnTKrCDAZhcAB5YhWXdcUmiihHhKKpIwpAGqM\nnpeD2pxk/U3IX51T/wFJDRABuXAnkHgTBrFlHuljhoQ3gCMu/Km0JnmLmAerLFAV\n9FhdaCHiAQKBgDl00sNRVJ0CRi6bM1pPVmS16hO0neSuKnRq9TLUlVVIU0Kc98pr\nSZ1jpEeeW9qzHSVmubqnfQGc2ZKutCxi3rjNaS0l2RnfE++n5FG6nmoK2Aqr5muC\nW895h+aFAmMfoGGUuXEjCQKWfBHSSKGava/0ttHTKfJ3UG84avH0h+KrAoGAadKG\n5zBRg5HfENKBQAWsoBwCWGv3MpjEbKNssF7iihxwV0ZMcnI23/bbfE2PbHacSIsU\n0FKRKXKVwT5qdYcS/T6NRMZKhRTH63pcLBmjWRN5rRwZmnntQhtO2N1Pdpr+4Y7P\nD/29dZTc3qQaLmTUlJ+QnnEyiQwnu9b//thaaAECgYEAsxvlfQQDdm3FUnBCtE3g\n+BiPSOI/H8KyUmNRqfPiXvGAI9g+7qguEwp4nNIrUkGtIcBEMv4ggoVOHV1aepFm\n6wB/jVa+0m/tZA1N/+rCAxMSHII6/E6SCiaNQPOuNa3jRk/eaaZaXFOLVSKyjLkN\n2rvtYjiZpja6DIVD+GFR2S4=\n-----END PRIVATE KEY-----\n"

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
