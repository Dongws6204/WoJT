from rest_framework import serializers
from ...models import Orders, Orderdetail

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderdetail
        fields = ['order', 'quantity', 'total_amount', 'id_prod']

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True, source='orderdetails')
    
    class Meta:
        model = Orders
        fields = ['order_id', 'customer_id', 'order_date', 'total_amount', 'status', 'order_details']
#order
class CreateOrder(serializers.ModelSerializer):
    class Meta:
        model = Orders 
        fields = '__all__'



#order_details
class CreateOrderDetails(serializers.ModelSerializer):
    class Meta:
        model = Orderdetail
        fields = '__all__'