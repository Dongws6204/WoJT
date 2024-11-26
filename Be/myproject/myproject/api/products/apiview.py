from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Products,Object
from .serializers import (ProductSerializer, GetCardSerializer, GetAllObjectSerializers)
        
#Lấy thông tin sản phẩm theo id.
class ProductAPIView(APIView):
    def get(self, request, id):
        try:
            product = Products.objects.get(product_id=id)
            product_serializer = ProductSerializer(product)
            response_data = {"product": product_serializer.data}
            return Response(response_data, status=status.HTTP_200_OK)
        
        except Products.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)


#Lấy sản phẩm theo theo id danh mục
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

#Lấy toàn bộ sản phẩm theo Đối tượng và danh mục
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
        

#Lấy sản phẩm theo đối tượng
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


#Lấy toàn bộ sản phẩm theo các đối tượng.
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
        
        except Object.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

#Lấy danh sách sản phẩm bán chạy.
class GetHighlightProductsAPIView(APIView):
    def get(self, request):
        try:
            products = Products.objects.filter(quantity__gt=100)
            if products.exists():
                products_serializer = GetCardSerializer(products, many =True)
                response_data = {"products": products_serializer.data}
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        except Products.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)