from django.urls import path
from .apiview import (OrderAPIView, CreateOrderAPIView, CreateOrderDetailAPIView)

urlpatterns = [
    #lấy toàn bộ đơn đặt hàng
    path('<int:id>/', OrderAPIView.as_view(), name='order'),  # id là primary key của Orders
    path('create', CreateOrderAPIView.as_view(), name='create'),
    path('create-detail', CreateOrderDetailAPIView.as_view(), name='create-detail'),
]
