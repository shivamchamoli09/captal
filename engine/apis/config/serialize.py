from rest_framework import serializers
from apis.models.price_estimation import PriceEstimationModel


class PriceEstimationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceEstimationModel
        fields = ["assetName", "currentDate", "currentPrice", "estimatedPriceDate", "estimatedPrice"]
