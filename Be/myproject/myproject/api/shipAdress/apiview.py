from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import ShippingInfo, Address
from .serializers import ShippingAddressSerializer,AddressSerializer

# Lấy thông tin sản phẩm theo id.
class ShippingAddressAPIView(APIView):
    def post(self, request):
        try:
            serializer = ShippingAddressSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except ShippingInfo.DoesNotExist:
            return Response({"message": "Địa chỉ giao hàng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

class AddressAPIView(APIView):
    def get(self, request, *args, **kwargs):
        address = Address.objects.all()
        res = AddressSerializer(address, many=True)  # Thêm many=True
        return Response(res.data, status=status.HTTP_200_OK)
