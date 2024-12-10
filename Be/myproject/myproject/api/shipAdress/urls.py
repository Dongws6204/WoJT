from django.urls import path
from .apiview import AddressAPIView, DeleteAddressView

urlpatterns = [

    path('<int:id>', AddressAPIView.as_view(), name='address'),
    path('delete/<int:id>', DeleteAddressView.as_view(), name='delete'),

   
]
