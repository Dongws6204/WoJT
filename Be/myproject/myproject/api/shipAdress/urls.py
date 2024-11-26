from django.urls import path
from .apiview import ShippingAddressAPIView

urlpatterns = [

    path('', ShippingAddressAPIView.as_view(), name='ship'),

   
]
