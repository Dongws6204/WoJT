from rest_framework import serializers
from ...models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address_id', 'address', 'postal_code', 'customer']

