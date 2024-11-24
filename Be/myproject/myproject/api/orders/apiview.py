from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Customers, Products, ProductDetail, Portfolio, Evaluate, ClothesEvaluate, Object, Orders
from .serializers import (GetOrderSerializers)

from datetime import timedelta

# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
#     'AUTH_HEADER_TYPES': ('Bearer',),
# }




class GetOrdersAPIView(APIView):
    def get(self, request):
        try:

            order = Orders.objects.all() # Dùng '__' để truy cập các thuộc tính của các quan hệ khóa ngoại
            if order.exists():  # Kiểm tra nếu có sản phẩm nào khớp
                order_serializer = GetOrderSerializers(order, many=True)  
                response_data = {"order": order_serializer.data}
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Thông tin không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        except Products.DoesNotExist:
            return Response({"message": "Thông tin không tồn tại"}, status=status.HTTP_404_NOT_FOUND)