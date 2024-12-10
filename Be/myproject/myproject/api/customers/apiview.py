from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Customers
from .serializers import CustomerSerializer
from django.contrib.auth.hashers import make_password

class CustomerAPIView(APIView):
    def get(self, request, id):
        try:
            customer = Customers.objects.get(customer_id=id)
            serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customers.DoesNotExist:
                return Response({"message": "Loi"}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request, id):
        try:
            # Lấy đối tượng khách hàng từ DB
            cus = Customers.objects.get(customer_id=id)
            data = request.data

            # Tạo một dict lưu trữ các trường cần cập nhật
            update_fields = {}

            if cus.name != data.get('name'):
                update_fields['name'] = data['name']
            if cus.phone != data.get('phone'):
                update_fields['phone'] = data['phone']
            if cus.address != data.get('address'):
                update_fields['address'] = data['address']
            if cus.birthday != data.get('birthday'):
                update_fields['birthday'] = data['birthday']

            # Chỉ cập nhật nếu có thay đổi
            if update_fields:
                Customers.objects.filter(customer_id=id).update(**update_fields)

            return Response({'message': "success"}, status=status.HTTP_200_OK)

        except Customers.DoesNotExist:
            return Response({"error": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)




        except Customers.DoesNotExist:
            return Response({"error": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
