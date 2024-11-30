from django.db import models


class PriceEstimationModel(models.Model):
    assetName = models.CharField(max_length=180)
    currentDate = models.CharField(max_length=50)
    currentPrice = models.FloatField(default=False, blank=True)
    estimatedPriceDate = models.CharField(max_length=50)
    estimatedPrice = models.FloatField(default=False, blank=True)

    def __str__(self):
        return self.assetName
