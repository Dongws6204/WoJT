from django.urls import path
from .apiview import (ProductAPIView, GetPortFolioProductAPIView, GetAllProductAPIView, 
                      GetObjectProductAPIView, GetAllObjectAPIView,
                      GetProductSearchAPIView)

urlpatterns = [

    path('<int:id>', ProductAPIView.as_view(), name='product'),

    #Trả về theo PortFolio
    path('portfolio/<int:id>', GetPortFolioProductAPIView.as_view(), name='object-product' ),

    #Trả về toàn bộ 
    path('',GetAllProductAPIView.as_view(),name="all-products-card"),

    #Trả về theo Object
    path('object/<int:id>',GetObjectProductAPIView.as_view(),name="object-card"),


    #Tra ve toan bo object va pofolio
    path('list-object', GetAllObjectAPIView.as_view(), name='list-object'),
    path('search', GetProductSearchAPIView.as_view(), name='search'),
]
