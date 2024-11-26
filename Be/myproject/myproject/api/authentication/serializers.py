from rest_framework import serializers
from ...models import Customers

class  IsLoggedInSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    customerId = serializers.IntegerField(allow_null=True)

class CheckAccountSerializer(serializers.Serializer):
    user_name = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(required=True)

    def validate_user_name(self, value):
        if Customers.objects.filter(user_name=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if Customers.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

class CreateSuccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['name', 'email', 'phone', 'address', 'birthday', 'pass_word', 'user_name']