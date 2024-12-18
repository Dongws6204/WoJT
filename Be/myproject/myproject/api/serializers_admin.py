from rest_framework import serializers
from ...models import Products, ProductDetail, Customers, Orders, Portfolio

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = '__all__'

    def create(self, validated_data):
        product_detail = ProductDetail.objects.create(**validated_data)
        return product_detail

class CreateProduct(serializers.ModelSerializer):
    product_detail = ProductDetailSerializer(many=True, write_only=True)
    
    class Meta: 
        model = Products
        fields = [
            'product_name', 'quantity_stock', 'id_port', 'price',
            'img_1', 'quantity_sold','description', 'product_detail'
        ]

    def create(self, validated_data):

        product_detail_data = validated_data.pop('product_detail')

        product = Products.objects.create(**validated_data)
        for data in product_detail_data:
            ProductDetail.objects.create(product=product,**product_detail_data)
        return product
    


    #Cấm tài khoản.
class getBanAccountSerializer(serializers.ModelSerializer):
    statusAcc = serializers.CharField(max_length=5)
    class Meta:
        model = Customers
        fields = ['id', 'statusAcc']


class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer_id.name')

    class Meta:
        model = Orders
        fields = ['order_id', 'order_date', 'total_amount', 'status', 'customer_name']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'



class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id_port', 'port_name', 'object']  # Các trường bạn muốn trả về



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
