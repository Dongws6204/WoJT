from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
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
    def get(self, request, id):
        address = Address.objects.filter(customer=id)
        if address.exists():
            res = AddressSerializer(address, many=True)
            return Response(res.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
    
    def post(self, request, id):
        # Lấy dữ liệu từ request
        statusRequest = request.data.get('status')
        address_id = request.data.get('address_id')

        # Kiểm tra các tham số
        if statusRequest is not None and address_id:
            try:
                # Gọi procedure trong MySQL
                with connection.cursor() as cursor:
                    cursor.callproc('update_address_status', [address_id, id, statusRequest])

                return Response({"Message": "Cập nhật thành công!"}, status=status.HTTP_200_OK)
            except Exception as e:
                # Nếu có lỗi trong quá trình gọi procedure
                return Response({"Message": f"Đã xảy ra lỗi: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            # Nếu thiếu thông tin đầu vào
            return Response({"Message": "Trạng thái hoặc địa chỉ không hợp lệ!"}, status=status.HTTP_400_BAD_REQUEST)

        


class AddAddressAPIView(APIView):
    def post(self, request):
        data = request.data
        address = AddressSerializer(data=data)  # Khởi tạo serializer với tham số data
        if address.is_valid():
            address.save()
            return Response(address.data, status=status.HTTP_201_CREATED)
       
        return Response(address.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteAddressAPIView(APIView):
    def post(self, request):
        address_id = request.data.get('address_id')
        if not address_id:
            return Response({"error": "address_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        res = Address.objects.filter(address_id=address_id)
        if res.exists():
            res.delete()
            return Response({"message": "Address deleted successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Address not found"}, status=status.HTTP_404_NOT_FOUND)
