from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Customers, Products,Orders
from .serializers import (GetOrderSerializers, CreateOrderSerializer)


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
    #Tao don hang moi 
    
    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetailAPIView(APIView):

    def get(self, request, order_id):
        try:
            order = Orders.objects.get(order_id=order_id)
            serializer = CreateOrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Orders.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)


