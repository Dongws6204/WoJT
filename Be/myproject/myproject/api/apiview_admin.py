from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
from ...models import Products, ProductDetail, Orders, Customers, Portfolio,Sales, Orderdetail
from .serializers import (ProductDetailSerializer, CreateProduct, OrderSerializer, 
                          CustomerSerializer, PortfolioSerializer, ProductSerializer)



class ProductManagementAPIView(APIView):
    def get(self, request, pk):
        try:

            product = Products.objects.get(pk=pk)
            return Response(CreateProduct(product).data, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

#  Cập nhật sản phẩm dùng post
    def post(self, request):
        data_ = CreateProduct(data=request.data)
        if data_.is_valid():
            data_.save()
            return Response(data_.data, status=status.HTTP_200_OK)
        return Response(data_.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)



class ProductDetailManagementAPIView(APIView):
    def get(self, request, pk):
        try:

            product = ProductDetail.objects.get(pk=pk)
            return Response(ProductDetailSerializer(product).data, status=status.HTTP_200_OK)
        except ProductDetail.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        serializers = ProductDetailSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            product_detail = ProductDetail.objects.get(pk=pk)
        except ProductDetail.DoesNotExist:
            return Response({"error": "Product detail not found"}, status=status.HTTP_404_NOT_FOUND)

        serializers = ProductDetailSerializer(product_detail, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            product_detail = ProductDetail.objects.get(pk=pk)
        except ProductDetail.DoesNotExist:
            return Response({"error": "Product detail not found"}, status=status.HTTP_404_NOT_FOUND)

        product_detail.delete()
        return Response({"message": "Product detail deleted successfully"}, status=status.HTTP_204_NO_CONTENT)





#Lấy 5 đơn hàng gần nhất
class GetNewOrderAPIView(APIView):
    def get(self, request):
  # Lấy 10 đơn hàng gần nhất
        orders = Orders.objects.all().select_related('customer_id').order_by('-order_id')[:10]
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



#Lấy danh sách người dùng:
class GetAllUsersAPIView(APIView):
    def get(self, request):
        customer = Customers.objects.all()
        res = CustomerSerializer(customer, many=True)
        return Response(res.data, status=status.HTTP_200_OK)
    

class DeleteUserAPIView(APIView):
    """
    APIView để xóa người dùng.
    """
    def delete(self, request, id):
        try:
            user = Customers.objects.get(customer_id=id)
            user.delete()
            return Response({"message": "Người dùng đã được xóa thành công"}, status=status.HTTP_204_NO_CONTENT)
        except Customers.DoesNotExist:
            return Response({"error": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)


#Tìm kiếm theo danh mục 
class PortfolioView(APIView):
    # Lấy danh sách danh mục, có thể tìm kiếm theo port_name
    def get(self, request):
        port_name = request.query_params.get('port_name')  # Lấy từ khóa port_name từ query parameters

        # Lọc danh mục
        portfolios = Portfolio.objects.all()
        if port_name:
            portfolios = portfolios.filter(port_name__icontains=port_name)  # Tìm kiếm không phân biệt hoa thường

        # Serialize dữ liệu
        serializer = PortfolioSerializer(portfolios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Thêm danh mục mới
    def post(self, request):
        serializer = PortfolioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Danh mục được thêm thành công!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    # Cập nhật danh mục bằng lệnh update
    def put(self, request):
        id_port = request.data.get('id_port')
        port_name = request.data.get('port_name')
        object_id = request.data.get('object')

        try:
            # Kiểm tra danh mục có tồn tại không
            portfolio = Portfolio.objects.get(id_port=id_port)
        except Portfolio.DoesNotExist:
            return Response({'error': 'Danh mục không tồn tại!'}, status=status.HTTP_404_NOT_FOUND)

        # Lệnh update trực tiếp
        updated_fields = {}
        if port_name:
            updated_fields['port_name'] = port_name
        if object_id:
            updated_fields['object_id'] = object_id

        # Kiểm tra nếu có trường nào để cập nhật
        if updated_fields:
            Portfolio.objects.filter(id_port=id_port).update(**updated_fields)
            return Response({'message': 'Danh mục được cập nhật thành công!'}, status=status.HTTP_200_OK)
 
        return Response({'error': 'Không có trường nào để cập nhật!'}, status=status.HTTP_400_BAD_REQUEST)

class DeletePortAPIView(APIView):
    def get(self, request, id):
        try:
            # Lấy đối tượng Portfolio có id_port là id
            objectGet = Portfolio.objects.get(id_port=id)
            # Serialize dữ liệu của đối tượng
            res = PortfolioSerializer(objectGet)
            return Response(res.data, status=status.HTTP_200_OK)
        except Portfolio.DoesNotExist:
            return Response({'error': 'Danh mục không tồn tại!'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        try:
            objectDelete = Portfolio.objects.get(id_port=id)
            objectDelete.delete()
            return Response({'message': 'Danh mục đã được xóa thành công!'}, status=status.HTTP_200_OK)
        except Portfolio.DoesNotExist:
            return Response({'error': 'Danh mục không tồn tại!'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            # Lấy đối tượng Portfolio có id_port là id
            portfolio = Portfolio.objects.get(id_port=id)
        except Portfolio.DoesNotExist:
            return Response({'error': 'Danh mục không tồn tại!'}, status=status.HTTP_404_NOT_FOUND)

        # Lệnh update trực tiếp
        updated_fields = {}
        if 'port_name' in request.data:
            updated_fields['port_name'] = request.data['port_name']
        if 'object' in request.data:
            updated_fields['object_id'] = request.data['object']

        # Kiểm tra nếu có trường nào để cập nhật
        if updated_fields:
            Portfolio.objects.filter(id_port=id).update(**updated_fields)
            return Response({'message': 'Danh mục được cập nhật thành công!'}, status=status.HTTP_200_OK)
        return Response({'error': 'Không có trường nào để cập nhật!'}, status=status.HTTP_400_BAD_REQUEST)

#Sản phẩm 
class ProductListAPIView(APIView):
    """
    APIView để lấy danh sách sản phẩm.
    """
    def get(self, request):
        products = Products.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductCreateAPIView(APIView):
    """
    APIView để thêm sản phẩm và chi tiết sản phẩm.
    """
    def post(self, request):
        product_data = request.data.get('product')
        details_data = request.data.get('details')

        # Tạo sản phẩm
        product_serializer = ProductSerializer(data=product_data)
        if product_serializer.is_valid():
            product = product_serializer.save()

            # Tạo chi tiết sản phẩm
            for detail in details_data:
                detail['product'] = product.product_id  # Gắn product_id vào chi tiết
                detail_serializer = ProductDetailSerializer(data=detail)
                if detail_serializer.is_valid():
                    detail_serializer.save()
                else:
                    return Response(detail_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "product": product_serializer.data,
                "details": details_data
            }, status=status.HTTP_201_CREATED)
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductUpdateAPIView(APIView):
    """
    APIView để sửa thông tin sản phẩm và chi tiết sản phẩm.
    """
    def put(self, request, product_id):
        try:
            product = Products.objects.get(product_id=product_id)
        except Products.DoesNotExist:
            return Response({"error": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

        product_data = request.data.get('product')
        details_data = request.data.get('details')

        # Cập nhật thông tin sản phẩm
        product_serializer = ProductSerializer(product, data=product_data)
        if product_serializer.is_valid():
            product = product_serializer.save()

            # Cập nhật chi tiết sản phẩm
            for detail in details_data:
                detail_id = detail.get('id_prod')
                if detail_id:
                    try:
                        product_detail = ProductDetail.objects.get(id_prod=detail_id)
                        detail_serializer = ProductDetailSerializer(product_detail, data=detail)
                    except ProductDetail.DoesNotExist:
                        return Response({"error": "Chi tiết sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
                else:
                    detail['product'] = product.product_id  # Gắn product_id vào chi tiết mới
                    detail_serializer = ProductDetailSerializer(data=detail)

                if detail_serializer.is_valid():
                    detail_serializer.save()
                else:
                    return Response(detail_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "product": product_serializer.data,
                "details": details_data
            }, status=status.HTTP_200_OK)
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProductDeleteAPIView(APIView):
    """
    APIView để xóa sản phẩm.
    """
    def get(self, request, product_id):
        try:
            # Lấy đối tượng Products có product_id là product_id
            product = Products.objects.get(product_id=product_id)
            # Serialize dữ liệu của đối tượng Products
            product_serializer = ProductSerializer(product)
            
            # Lấy các chi tiết sản phẩm liên quan
            product_details = ProductDetail.objects.filter(product=product)
            product_details_serializer = ProductDetailSerializer(product_details, many=True)
            
            # Trả về dữ liệu sản phẩm và chi tiết sản phẩm
            return Response({
                "product": product_serializer.data,
                "details": product_details_serializer.data
            }, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            return Response({'error': 'Sản phẩm không tồn tại!'}, status=status.HTTP_404_NOT_FOUND)


    def delete(self, request, product_id):
        try:
            product = Products.objects.get(product_id=product_id)
        except Products.DoesNotExist:
            return Response({"error": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response({"message": "Sản phẩm đã được xóa thành công"}, status=status.HTTP_200_OK)


#sale

class ProductAndSalesAPIView(APIView):
    """
    APIView để lấy thông tin sản phẩm và các thông tin liên quan đến sales.
    """

    def get(self, request):
        try:
            # Lấy thông tin sản phẩm
            products = Products.objects.values(
                'product_id',  # ID sản phẩm
                'product_name',  # Tên sản phẩm
                'price',  # Giá sản phẩm
                'img_1'  # URL ảnh sản phẩm
            )

            # Lấy thông tin sale, liên kết với sản phẩm
            sales = Sales.objects.select_related('product').values(
                'sale_id',  # ID sale
                'discount',  # Phần trăm giảm giá
                product_name=F('product__product_name'),  # Tên sản phẩm từ bảng Products
                price=F('product__price'),  # Giá sản phẩm từ bảng Products
                img=F('product__img_1')  # Ảnh sản phẩm từ bảng Products
            )

            # Trả về dữ liệu dạng JSON
            return Response(
                {
                    "products": list(products),
                    "sales": list(sales),
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            # Xử lý lỗi
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class OrderListView(APIView):
    """
    API để lấy tất cả danh sách order và chi tiết đơn hàng.
    """
    def get(self, request):
        try:
            # Lấy tất cả đơn hàng
            orders = Orders.objects.all()
          
            order_list = []

            # Duyệt qua từng đơn hàng và lấy thông tin chi tiết
            for order in orders:
                try:
                    customers = Customers.objects.get(customer_id=order.customer_id_id)
                except Customers.DoesNotExist:
                    customers = None  # Nếu không tìm thấy khách hàng, trả về None

                # Lấy tất cả chi tiết đơn hàng liên quan
                order_details = Orderdetail.objects.filter(order=order)
                details_list = []
                
                for detail in order_details:
                    # Lấy thông tin sản phẩm từ ProductDetail
                    product = ProductDetail.objects.get(id_prod=detail.id_prod_id)
                    products = Products.objects.get(product_id=product.id_prod)
                    details_list.append({
                        "product_id": product.id_prod,
                        "product_name": products.product_name,  # Giả sử ProductDetail có trường product_name
                        "quantity": detail.quantity or 0,  # Thay thế None bằng 0
                        "size": product.size,  # Giả sử ProductDetail có trường size
                        "price": float(products.price or 0.0),  # Xử lý None
                    })

                # Nếu không tìm thấy khách hàng, không thêm đơn hàng vào danh sách
                if customers:
                    order_list.append({
                        "order_id": order.order_id,
                        "user_name": customers.user_name,
                        "name":customers.name,
                        "email": customers.email,
                        "phone": customers.phone,
                        "address": customers.address,
                        "order_date": order.order_date,
                        "total_amount": float(order.total_amount or 0.0),  # Xử lý None
                        "status": order.status,
                        "order_detail": details_list,
                    })

            # Trả về dữ liệu với cấu trúc đúng
            return Response({"orders": order_list}, status=status.HTTP_200_OK)

        except Exception as e:
            # Trả về lỗi nếu có sự cố trong quá trình xử lý
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UpdateOrderStatusView(APIView):
    """
    API để cập nhật trạng thái của một order.
    """
    def post(self, request, order_id):
        try:
            # Lấy trạng thái mới từ request body
            new_status = request.data.get("status")

            # Kiểm tra dữ liệu đầu vào
            if new_status is None:
                return Response({"error": "Trạng thái mới không được để trống"}, status=status.HTTP_400_BAD_REQUEST)

            # Cập nhật trạng thái đơn hàng trực tiếp trong cơ sở dữ liệu
            updated_rows = Orders.objects.filter(order_id=order_id).update(status=new_status)

            if updated_rows == 0:
                return Response({"error": "Order không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

            return Response({"message": "Cập nhật trạng thái thành công!"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


