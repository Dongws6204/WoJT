from rest_framework import serializers
from .models import Customers

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['name', 'email', 'phone', 'birthday', 'pass_word', 'user_name']  # Default fields for POST

class CustomerLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['customer_id', 'user_name', 'pass_word']

