from django.urls import path
from .apiview import (GetReviewsAPIView, PostCommentAPIView)

urlpatterns = [
    # #lấy toàn bộ đơn đặt hàng
    path('product/<int:id>', GetReviewsAPIView.as_view(), name='order'),
    path('',PostCommentAPIView.as_view(), name='comment')

]
