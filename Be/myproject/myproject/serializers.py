from rest_framework import serializers
from .models import Customers, Products, ProductDetail, Evaluate, Portfolio, Object, Orders, Orderdetail
from django.db.models import Avg  # Import Avg từ Django


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['customer_id', 'name', 'email', 'phone', 'address', 'birthday','user_name', 'role']  # Default fields for POST


class  IsLoggedInSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    customerId = serializers.IntegerField(allow_null=True)



class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ['id_prod', 'size']

class EvaluateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluate
        fields = ['customer', 'date_posted', 'star', 'comments']

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields =['id_port', 'port_name']


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderdetail
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    product_name = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    img = serializers.CharField(source='img_1')
    description = serializers.CharField(allow_null=True)
    product_rate = serializers.SerializerMethodField()
    quantity_sold = serializers.IntegerField()
    quantity_stock = serializers.IntegerField()
    object = serializers.CharField(source='id_port.object.object_name')
    portfolio = serializers.CharField(source='id_port.port_name')

    # Truy xuất chi tiết sản phẩm thông qua `related_name` hoặc mặc định
    product_detail = ProductDetailSerializer(many=True, read_only=True, source='product_details')
    # Truy xuất đánh giá sản phẩm thông qua `related_name` hoặc mặc định
    rate = EvaluateSerializer(many=True, read_only=True, source='evaluates')


    
    class Meta:
        model = Products
        fields = [
            'product_id', 'product_name', 'price', 'img', 'description',
            'product_rate', 'quantity_sold', 'quantity_stock', 'object',
            'portpolio', 'product_detail', 
            'rate',
        ]
    def get_product_rate(self, obj):
        # Sử dụng evaluate_set để lấy tất cả đánh giá của sản phẩm
        reviews = obj.evaluates.all()
        if reviews.exists():
            average_rate = reviews.aggregate(Avg('star'))['star__avg']
            return round(average_rate, 1) if average_rate is not None else 0
        return 0
    



class GetCardSerializer(serializers.ModelSerializer):
    img = serializers.CharField(source='img_1')
    class Meta:
        model = Products
        fields = [
            'product_id', 'img', 'product_name', 'price',
        ]



class GetAllObjectSerializers(serializers.ModelSerializer):
    portfolio = PortfolioSerializer(many=True, read_only=True, source='portfolios')
    class Meta:
        model = Object
        fields =[
            'object_id', 'object_name', 'portfolio',
        ]



class GetOrderSerializer(serializers.ModelSerializer):
    order_detail= OrderDetailSerializer(many=True, read_only=True, source='orderdetails')
    class Meta:
        model = Orders
        fields =[
            'order_id','customer', 'order_date', 'total_amount','status', 'order_detail'
        ]