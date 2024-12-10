from rest_framework import serializers
from ...models import Orders, Orderdetail

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderdetail
        fields = ['order', 'quantity', 'total_amout', 'product', 'id_prod']

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True, source='orderdetails')
    
    class Meta:
        model = Orders
        fields = ['order_id', 'customer', 'order_date', 'total_amount', 'status', 'order_details']

    def create(self, validated_data):
        # Tách dữ liệu order_details
        order_details_data = validated_data.pop('order_details')
        order = Orders.objects.create(**validated_data)
        
        # Tạo các chi tiết đơn hàng
        for detail_data in order_details_data:
            Orderdetail.objects.create(order=order, **detail_data)
        
        return order
