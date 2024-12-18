from rest_framework import serializers
from ...models import Evaluate, Customers

class EvaluateSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()  

    class Meta:
        model = Evaluate
        fields = ['customer', 'date_posted', 'star', 'comments']

    def get_customer(self, obj):
        # Truy cập đối tượng customer từ obj (Evaluate)
        if obj.customer:
            return obj.customer.name  # Giả sử model Customers có trường 'name'
        return None  # Trả về None nếu customer không tồn tại


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluate
        fields = '__all__'