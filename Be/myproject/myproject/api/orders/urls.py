from django.urls import path
from .apiview import (OrderAPIView, CreateOrderAPIView, 
                      CreateOrderDetailAPIView, getOrderAPIView,
                      getOrderDetailAPIView, getProductDetailAPIView,
                      deleteOrderAPIView)

urlpatterns = [
    #lấy toàn bộ đơn đặt hàng
    path('<int:id>/', OrderAPIView.as_view(), name='order'),  # id là primary key của Orders
    path('create', CreateOrderAPIView.as_view(), name='create'),
    path('create-detail', CreateOrderDetailAPIView.as_view(), name='create-detail'),
   
#   
    path('get/<int:id>', getOrderAPIView.as_view(), name='get'),
    path('get-detail', getOrderDetailAPIView.as_view(), name='get-detail'),
    path('get-productdetail', getProductDetailAPIView.as_view(), name='get-products-details'),
    path('delete/<int:id>', deleteOrderAPIView.as_view(), name='delete'),
]
