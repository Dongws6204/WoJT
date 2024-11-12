from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customers
from .serializers import CustomerSerializer, CustomerLoginSerializer
from django.shortcuts import get_object_or_404

class CustomerListCreateAPIView(APIView): 
    def get(self, request): 
        customers = Customers.objects.all() 
        serializer = CustomerSerializer(customers, many=True) 
        return Response(serializer.data) 
    
    def post(self, request): 
        serializer = CustomerSerializer(data=request.data) 
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        customer = Customers.objects.all()
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CustomerLoginAPIView(APIView):
    def get(self, request):
        customer = Customers.objects.all()
        serializer = CustomerLoginSerializer(customer, many=True)
        return Response(serializer.data)


class CustomerDetailAPIView(APIView):
    def get(self, request, pk):
        customer = get_object_or_404(Customers, pk=pk)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)

    def put(self, request, pk):
        customer = get_object_or_404(Customers, pk=pk)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        customer = get_object_or_404(Customers, pk=pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
