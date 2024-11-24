from rest_framework import serializers
from ...models import Orders, Orderdetail
from django.db.models import Avg  # Import Avg từ Django

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderdetail
        fields = '__all__'

class GetOrderSerializers(serializers.ModelSerializer):
    order_detail= OrderDetailSerializer(many=True, read_only=True, source='orderdetails')
    class Meta:
        model = Orders
        fields =[
            'order_id','customer', 'order_date', 'total_amount','status', 'order_detail'
        ]