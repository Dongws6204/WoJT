from rest_framework.views import APIView
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
    

