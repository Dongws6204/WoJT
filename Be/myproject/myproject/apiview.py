from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customers, Products, ProductDetail, Portfolio, Evaluate, ClothesEvaluate, Object, Orders
from .serializers import (CustomerSerializer, IsLoggedInSerializer, 
                        ProductSerializer, GetCardSerializer, 
                        GetAllObjectSerializers, GetOrderSerializer)
from django.shortcuts import get_object_or_404
from datetime import timedelta

# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
#     'AUTH_HEADER_TYPES': ('Bearer',),
# }


class CustomerAPIView(APIView): 
    def get(self, request, id): 
        try: 
            customer = Customers.objects.get(customer_id=id) 
            customer.role = 1
            serializer = CustomerSerializer(customer) 

            return Response(serializer.data, status=status.HTTP_200_OK) 
        except Customers.DoesNotExist: 
            return Response({"message": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
    




class LoginAPIView(APIView):
   def post(self, request):
        username = request.data.get('user_name')
        password = request.data.get('pass_word')

        if not username or not password:
            # Trả về lỗi nếu thiếu username hoặc password
            return Response({'success': False, 'customerId': None},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            # Tìm đối tượng `customer` trong model `Customers`
            customer = Customers.objects.get(user_name=username, pass_word=password)
            response_data = {
                'success': True,
                'customerId': customer.customer_id,
            }
            serializer = IsLoggedInSerializer(response_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customers.DoesNotExist:
            # Trường hợp không tìm thấy user
            response_data = {
                'success': False,
                'customerId': None,
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class ProductAPIView(APIView):
    def get(self, request, id):
        try:
            product = Products.objects.get(product_id=id)
            product_serializer = ProductSerializer(product)
            response_data = {"product": product_serializer.data}
            return Response(response_data, status=status.HTTP_200_OK)
        
        except Products.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)


class GetPortFolioProductAPIView(APIView):
    def get(self, request, id):
        try:
            products = Products.objects.filter(id_port=id)  # Use filter to get all matching products
            if products.exists():  # Check if there are any products
                product_serializer = GetCardSerializer(products, many=True)  # Serialize multiple products
                response_data = {"products": product_serializer.data}
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        except Products.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)


class GetAllProductAPIView(APIView):
    def get(self, request):
        try:
            products = Products.objects.all()  # Use filter to get all matching products
            if products.exists():  # Check if there are any products
                product_serializer = GetCardSerializer(products, many=True)  # Serialize multiple products
                response_data = {"products": product_serializer.data}
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        except Products.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        

class GetObjectProductAPIView(APIView):
    def get(self, request, id):
        try:
            # Lọc các sản phẩm dựa trên id của object trong id_port
            products = Products.objects.filter(id_port__object__object_id=id)  # Dùng '__' để truy cập các thuộc tính của các quan hệ khóa ngoại
            if products.exists():  # Kiểm tra nếu có sản phẩm nào khớp
                product_serializer = GetCardSerializer(products, many=True)  # Serialize nhiều sản phẩm
                response_data = {"products": product_serializer.data}
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        except Products.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)


class GetAllObjectAPIView(APIView):
    def get(self, request):
        try:

            object = Object.objects.all() # Dùng '__' để truy cập các thuộc tính của các quan hệ khóa ngoại
            if object.exists():  # Kiểm tra nếu có sản phẩm nào khớp
                object_serializer = GetAllObjectSerializers(object, many=True)  
                response_data = {"products": object_serializer.data}
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        except Products.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)


class GetOrdersAPIView(APIView):
    def get(self, request):
        try:

            order = Orders.objects.all() # Dùng '__' để truy cập các thuộc tính của các quan hệ khóa ngoại
            if order.exists():  # Kiểm tra nếu có sản phẩm nào khớp
                order_serializer = GetAllObjectSerializers(order, many=True)  
                response_data = {"order": order_serializer.data}
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Thông tin không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        except Products.DoesNotExist:
            return Response({"message": "Thông tin không tồn tại"}, status=status.HTTP_404_NOT_FOUND)