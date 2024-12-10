from rest_framework import serializers
from ...models import Orders, Orderdetail

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


class CreateOrderSerializer(serializers.ModelSerializer):
    order_detail = OrderDetailSerializer(many=True, write_only=True)

    class Meta:
        model = Orders
        fields = [
            'customer', 'order_date', 'total_amount', 'status', 'order_detail'
        ]

    def create(self, validated_data):
        order_details_data = validated_data.pop('order_detail')
        order = Orders.objects.create(**validated_data)
        for order_detail_data in order_details_data:
            Orderdetail.objects.create(order=order, **order_detail_data)
        return order
