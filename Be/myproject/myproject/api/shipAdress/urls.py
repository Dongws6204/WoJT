from django.urls import path
from .apiview import ShippingAddressAPIView,AddressAPIView, AddAddressAPIView,DeleteAddressAPIView

urlpatterns = [

    path('', ShippingAddressAPIView.as_view(), name='ship'),
    #get and update
    path('address/<int:id>',AddressAPIView.as_view(), name='address'),
    #add
    path('address/add', AddAddressAPIView.as_view(), name='address-add'),

    path('address/delete', DeleteAddressAPIView.as_view(), name='address-delete')
   
]
