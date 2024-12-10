from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from ...models import Customers
from .serializers import (CustomerSerializer)


class CustomerAPIView(APIView): 
    def get(self, request, id): 
        try: 
            customer = Customers.objects.get(customer_id=id) 
            customer.role = 1
            serializer = CustomerSerializer(customer) 

            return Response(serializer.data, status=status.HTTP_200_OK) 
        except Customers.DoesNotExist: 
            return Response({"message": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
    

    def post(self, request, id):
            try:
                # Lấy dữ liệu từ request
                data = request.data

                # Cập nhật thông tin khách hàng dựa trên ID
                updated_count = Customers.objects.filter(customer_id=id).update(**data)

                # Kiểm tra xem có bản ghi nào được cập nhật không
                if updated_count > 0:
                    return JsonResponse({'message': 'Customer updated successfully'}, status=200)
                else:
                    return JsonResponse({'error': 'Customer not found or no changes made'}, status=404)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)