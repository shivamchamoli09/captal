from django.contrib import admin
from django.urls import path, include

from apis.price_estimator import PriceEstimatorApi
from engine import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('engine/', include(urls)),
    path('api', PriceEstimatorApi.as_view())
]
