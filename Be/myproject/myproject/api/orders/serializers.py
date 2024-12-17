from rest_framework import serializers
from ...models import Orders, Orderdetail, ProductDetail

class ProductDetailSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source='product.product_id')
    product_name = serializers.CharField(source='product.product_name')
    img = serializers.CharField(source='product.img_1')
    price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)

    class Meta:
        model = ProductDetail
        fields = ['product_id', 'product_name', 'img', 'price', 'size', 'id_prod']

class OrderDetailItemSerializer(serializers.ModelSerializer):
    product = ProductDetailSerializer(source='id_prod')

    class Meta:
        model = Orderdetail
        fields = ['quantity', 'product']


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderdetail
        fields = ['order', 'quantity', 'total_amount', 'id_prod']

class OrderSerializer(serializers.ModelSerializer):
    # order_details = OrderDetailSerializer(many=True, read_only=True, source='orderdetails')
    
    # class Meta:
    #     model = Orders
    #     fields = ['order_id', 'customer_id', 'order_date', 'total_amount', 'status', 'order_details']
    orderdetail = OrderDetailItemSerializer(source='orderdetails', many=True)
    # order_id = serializers.IntegerField(source='id')  # Nếu cần đổi tên trường
    # total_amount = serializers.SerializerMethodField()
    # order_date = serializers.DateField(source='created_at', format='%d/%m/%Y')  # Định dạng ngày

    class Meta:
        model = Orders
        fields = ['order_id', 'orderdetail', 'total_amount', 'order_date']

    def get_total_amount(self, obj):
        # Tính tổng số tiền từ các OrderDetail
        return sum([item.total_amount for item in obj.orderdetails.all()])
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

# #Lay danh sach da dat
# class GetFirstStatusOrder(serializers.ModelSerializer):
#     class Meta:

class getOrder(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ['order_id', 'total_amount', 'order_date', 'status']

