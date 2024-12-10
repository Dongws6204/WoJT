from django.urls import path
from .apiview import (OrderAPIView)

urlpatterns = [
    #lấy toàn bộ đơn đặt hàng
    path('<int:id>/', OrderAPIView.as_view(), name='order'),  # id là primary key của Orders

]
