from django.urls import path
from .apiview import ShippingAddressAPIView,AddressAPIView

urlpatterns = [

    path('', ShippingAddressAPIView.as_view(), name='ship'),
    path('address',AddressAPIView.as_view(), name='address'),

   
]
