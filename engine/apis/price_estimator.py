from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from concurrent.futures import ThreadPoolExecutor
from apis.config.serialize import PriceEstimationSerializer
from apis.services.google_docs import write_to_google_sheet, clear_sheet
from apis.services.price_estimator import predict_next_day_price

from apis.constants.stocks import stocks as stocks_symbols

# Google Sheet Configuration
RANGE = "Sheet1!A2:E"  # Adjust to match your Google Sheet's layout


class PriceEstimatorApi(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # estimates = []  # List to store estimates
            clear_sheet()
            for stock in stocks_symbols:
                estimates = []
                print(f"Fetching estimate for {stock['name']}")
                # Sequentially call predict_next_day_price
                estimate = predict_next_day_price(stock)  # No `await`, fully synchronous
                estimates.append(estimate)
                print("All estimates are ready: ", estimates)

                # Serialize the incoming data
                serializer = PriceEstimationSerializer(data=estimates, many=True)
                serializer.is_valid(raise_exception=True)
                data = serializer.data

                # Prepare rows for writing to Google Sheets
                rows = [
                    [
                        entry["assetName"],
                        entry["currentDate"],
                        entry["currentPrice"],
                        entry["estimatedPriceDate"],
                        entry["estimatedPrice"],
                    ]
                    for entry in data
                ]
                write_to_google_sheet(RANGE, rows)

            # print("All estimates are ready: ", estimates)
            #
            #
            # # Serialize the incoming data
            # serializer = PriceEstimationSerializer(data=estimates, many=True)
            # serializer.is_valid(raise_exception=True)
            # data = serializer.data
            #
            # # Prepare rows for writing to Google Sheets
            # rows = [
            #     [
            #         entry["assetName"],
            #         entry["currentDate"],
            #         entry["currentPrice"],
            #         entry["estimatedPriceDate"],
            #         entry["estimatedPrice"],
            #     ]
            #     for entry in data
            # ]

            # Write to Google Sheet
            # response = write_to_google_sheet(RANGE, rows)

            return Response(
                {"message": "Data written to Google Sheet successfully."},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
