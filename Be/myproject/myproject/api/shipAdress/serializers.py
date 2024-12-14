from rest_framework import serializers
from ...models import ShippingInfo, Address

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInfo
        fields = '__all__'  # Hoặc bạn có thể liệt kê các trường cụ thể

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'