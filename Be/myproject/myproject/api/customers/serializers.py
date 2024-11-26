from rest_framework import serializers
from ...models import Customers


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['customer_id', 'name', 'email', 'phone', 'address', 'birthday','user_name', 'role']  # Default fields for POST
