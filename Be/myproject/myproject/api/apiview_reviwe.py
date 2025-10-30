from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Evaluate, Orders
# from ...models import Customers, Products, ProductDetail, Portfolio, Evaluate, ClothesEvaluate, Object, Orders
from .serializers import EvaluateSerializer, PostCommentSerializer

class GetReviewsAPIView(APIView):
    def get(self, request, id):
        product = id

        try:
            review = Evaluate.objects.filter(product=id)
            if review.exists():
                res = EvaluateSerializer(review, many=True)
                return Response(res.data, status=status.HTTP_200_OK)
            else:
                return Response({"message": " không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        except Evaluate.DoesNotExist:
            return Response({"message": "Sản phẩm không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        

class PostCommentAPIView(APIView):
    def post(self, request):
        serializer = PostCommentSerializer(data=request.data)
        customer_id = request.data.get('customer')
        
        # Kiểm tra status của Orders
        order_exists = Orders.objects.filter(customer_id=customer_id, status=3).exists()
        if not order_exists:
            return Response(
                {"error": "Không thể bình luận: Đơn hàng chưa hoàn tất"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Nếu kiểm tra thành công, validate và lưu
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Bình luận đã được đăng thành công"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self, request): 
        res = request.data 
        try: 
            evaluations = Evaluate.objects.filter(customer=res['customer'], product=res['product']) 
            if evaluations.exists(): 
                evaluations.delete() 
                return Response({"message": "Đánh giá đã được xóa thành công"}, status=status.HTTP_200_OK) 
            else: 
                return Response({"message": "Không tìm thấy đánh giá"}, status=status.HTTP_404_NOT_FOUND) 
        except KeyError: return Response({"message": "Dữ liệu không hợp lệ"}, status=status.HTTP_400_BAD_REQUEST)