from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Orders, Orderdetail
from .serializers import OrderSerializer, OrderDetailSerializer


class OrderAPIView(APIView):
    def get(self, request, id):
        orders = Orders.objects.filter(customer=id)
        if orders.exists():
            res = OrderSerializer(orders, many=True)
            return Response(res.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Không có đơn đặt hàng"}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request, id):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Đơn hàng đã được tạo thành công"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            order = Orders.objects.get(customer=id)
        except Orders.DoesNotExist:
            return Response({"message": "Đơn hàng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Trạng thái đơn hàng đã được cập nhật"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, id):
        try: 
            order = Orders.objects.get(customer=id)
            order.delete()
            return Response({"message": "delete success"}, status=status.HTTP_200_OK)
        except Orders.DoesNotExist:
            return Response({"message": "lôi khi xóa"}, status=status.HTTP_400_BAD_REQUEST)