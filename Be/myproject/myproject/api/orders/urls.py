from django.urls import path
from .apiview import (GetOrdersAPIView, OrderDetailAPIView)

urlpatterns = [
    #lấy toàn bộ đơn đặt hàng
    path('order', GetOrdersAPIView.as_view(), name='order'),
    path('order-detail', OrderDetailAPIView.as_view(), name='order-details'),

]
