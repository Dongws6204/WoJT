from django.urls import path
from .apiview import (GetOrdersAPIView)

urlpatterns = [
    #lấy toàn bộ đơn đặt hàng
    path('', GetOrdersAPIView.as_view(), name='order'),

]
