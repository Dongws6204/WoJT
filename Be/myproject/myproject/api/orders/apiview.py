from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Orders, Orderdetail, ProductDetail
from .serializers import (OrderSerializer, OrderDetailSerializer
                          ,CreateOrder, CreateOrderDetails, getOrder, ProductDetailSerializer)


class OrderAPIView(APIView):
    def get(self, request, id):
        orders = Orders.objects.filter(customer_id=id)
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
            order = Orders.objects.get(custome_id=id)
        except Orders.DoesNotExist:
            return Response({"message": "Đơn hàng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Trạng thái đơn hàng đã được cập nhật"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, id):
        try: 
            order = Orders.objects.get(customer_id=id)
            order.delete()
            return Response({"message": "delete success"}, status=status.HTTP_200_OK)
        except Orders.DoesNotExist:
            return Response({"message": "lôi khi xóa"}, status=status.HTTP_400_BAD_REQUEST)
        


class getOrderAPIView(APIView):
    def get(self, request, id):
        orders = Orders.objects.filter(customer_id=id)
        if orders.exists():
            serializer = getOrder(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Không có đơn đặt hàng"}, status=status.HTTP_404_NOT_FOUND)

class getOrderDetailAPIView(APIView):
    def post(self, request):
        order_ids = request.data.get('order_id', [])
        if not order_ids:
            return Response({"message": "No order IDs provided"}, status=status.HTTP_400_BAD_REQUEST)

        order_details = []
        for order_id in order_ids:
            details = Orderdetail.objects.filter(order_id=order_id)
            serializer = OrderDetailSerializer(details, many=True)
            order_details.extend(serializer.data)

        return Response(order_details, status=status.HTTP_200_OK)



class getProductDetailAPIView(APIView):
    def post(self, request):
        product_ids = request.data.get('id_prod', [])
        if not product_ids:
            return Response({"message": "No product IDs provided"}, status=status.HTTP_400_BAD_REQUEST)

        product_details = []
        for product_id in product_ids:
            product = ProductDetail.objects.filter(id_prod=product_id)
            if product.exists():
                serializer = ProductDetailSerializer(product, many=True)
                product_details.extend(serializer.data)

        return Response(product_details, status=status.HTTP_200_OK)


class deleteOrderAPIView(APIView):
    def delete(self, request, id):
        try:
            order = get_object_or_404(Orders, order_id=id)
            order.delete()
            return Response({"message": "Order deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




class CreateOrderAPIView(APIView):
    def post(self,request):
        res = CreateOrder(data=request.data)
        if res.is_valid():
            order = res.save() 
            order_id = order.order_id
            return Response({"order_id": order_id}, status=status.HTTP_201_CREATED)
        return Response({"message": "Loi"}, status=status.HTTP_400_BAD_REQUEST)
    

class CreateOrderDetailAPIView(APIView):
    def post(self, request):
        # Kiểm tra xem dữ liệu đầu vào có phải là một mảng không
        if isinstance(request.data, list):
            errors = []
            for item in request.data:
                serializer = CreateOrderDetails(data=item)
                if serializer.is_valid():
                    serializer.save()
                else:
                    errors.append(serializer.errors)
            
            if errors:
                return Response({"message": "Lỗi", "errors": errors}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"message": "Chi tiết Đơn hàng đã được tạo thành công"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Dữ liệu đầu vào không hợp lệ. Phải là một mảng các đối tượng."}, status=status.HTTP_400_BAD_REQUEST)
