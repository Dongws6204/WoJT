from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...settings import EMAIL_HOST_USER
from ...models import Customers
from django.core.mail import send_mail
from django.core.cache import cache
from django.contrib.auth.hashers import make_password
import random
import string
from django.contrib.auth.hashers import check_password
from .serializers import (IsLoggedInSerializer, CheckAccountSerializer, 
                          CreateSuccessSerializer, CheckForgotPasswordSerializer)


# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
#     'AUTH_HEADER_TYPES': ('Bearer',),
# }
#Đăng ký, đăng nhập, quên mật khẩu.

class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('user_name')
        password = request.data.get('pass_word')

        if not username or not password:
            # Trả về lỗi nếu thiếu username hoặc password
            return Response({'success': False, 'customerId': None},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            # Tìm đối tượng `customer` trong model `Customers`
            customer = Customers.objects.get(user_name=username)
            # customer.pass_word = x
            # if check_password(password, customer.pass_word):
            if check_password(password, customer.pass_word):
                response_data = {
                    'success': True,
                    'customerId': customer.customer_id,
                    # 'customerId': "15",
                }
                # customer.save()
                serializer = IsLoggedInSerializer(response_data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Mật khẩu không đúng
                response_data = {
                    'success': "Maat khau khong dung",
                    'customerId': None,
                }
                return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        except Customers.DoesNotExist:
            # Trường hợp không tìm thấy user
            response_data = {
                'success': False,
                'customerId': None,
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)


#Đăng ký
class CheckAccountAPIView(APIView):
    def post(self, request):
        serializer = CheckAccountSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {'error': 'Invalid data', 'details': serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        email = serializer.validated_data['email']
        otp = ''.join(random.choices(string.digits, k=4))

        cache_key = f'otp_{email}'
        cache.set(cache_key, otp, timeout=300)

        try:
            send_mail(
                'Your OTP Code',
                f'Your OTP code is: {otp}',
                EMAIL_HOST_USER, 
                [email],
                fail_silently=False,
            )
        except Exception as e:
            return Response(
                {'error': 'Failed to send email', 'details': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({'message': 'OTP sent successfully.'}, status=status.HTTP_200_OK)

class RegisterStatusAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        input_otp = request.data.get('otp')

        if not email or not input_otp:
            return Response({'error': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Truy xuất OTP từ cache
        cache_key = f'otp_{email}'
        cached_otp = cache.get(cache_key)

        if not cached_otp:
            return Response({'error': 'OTP expired or not found.'}, status=status.HTTP_400_BAD_REQUEST)

        if cached_otp != input_otp:
            return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)

        # OTP khớp, cập nhật trạng thái và không xóa OTP ngay
        cache.delete(cache_key)  # Xóa OTP để tránh bị lạm dụng
        status_key = f'status_{email}'
        cache.set(status_key, True, timeout=600)  # Trạng thái có hiệu lực trong 10 phút

        return Response({'message': 'OTP verified successfully!'}, status=status.HTTP_200_OK)

class GetInforCustomerRegisterAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Kiểm tra trạng thái xác thực OTP
        status_key = f'status_{email}'
        check_status = cache.get(status_key)

        if not check_status:
            return Response({'error': 'OTP verification required or expired.'}, status=status.HTTP_400_BAD_REQUEST)

        # Xác thực thành công, tiến hành lưu thông tin
        serializer = CreateSuccessSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data
        validated_data['role'] = 1  # Thêm trường role mặc định cho khách hàng

        # Băm mật khẩu trước khi lưu
        validated_data['pass_word'] = make_password(validated_data['pass_word'])

        # Lưu thông tin vào cơ sở dữ liệu
        customer = Customers(**validated_data)
        customer.save()

        # Xóa trạng thái xác thực OTP sau khi hoàn tất
        cache.delete(status_key)

        return Response({'message': 'Register Successfully!'}, status=status.HTTP_200_OK)


#Quên mật khẩu
class CheckForgotPasswordAPIView(APIView):
    def post(self, request):
        serializer = CheckForgotPasswordSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {'error': 'Invalid data', 'details': serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        email = serializer.validated_data['email']

        # Kiểm tra email có tồn tại trong hệ thống không
        if not Customers.objects.filter(email=email).exists():
            return Response(
                {'error': 'Email does not exist in our system'},
                status=status.HTTP_404_NOT_FOUND
            )

        otp = ''.join(random.choices(string.digits, k=4))
        cache_key = f'otp_{email}'
        cache.set(cache_key, otp, timeout=300)

        try:
            send_mail(
                'Your OTP Code',
                f'Your OTP code is: {otp}',
                EMAIL_HOST_USER, 
                [email],
                fail_silently=False,
            )
        except Exception as e:
            return Response(
                {'error': 'Failed to send email', 'details': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({'message': 'OTP sent successfully.'}, status=status.HTTP_200_OK)


class ForgotPasswordStatusAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        i_otp = request.data.get('otp')

        if not email or not i_otp:
            return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

        key = f'otp_{email}'
        cache_otp = cache.get(key)

        if not cache_otp:
            return Response({'error': 'OTP expired or invalid'}, status=status.HTTP_400_BAD_REQUEST)

        if cache_otp != i_otp:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

        # Xóa OTP sau khi xác thực thành công
        cache.delete(key)
        status_key = f'status_{email}'
        cache.set(status_key, True, timeout=120)

        return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)


class UpdatePasswordAPIView(APIView):
    # def get(self, request, *args, **kwargs):
    #     email = "cucu0375726692@gmail.com"
    #     status_key = f'status_{email}'
    #     otp_status = cache.get(status_key)
    #     return Response({"message": otp_status},status=status.HTTP_200_OK) 
    def post(self, request):
        email = request.data.get('email')
        newpassword = request.data.get('newpassword')

        if not email or not newpassword:
            return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

        # Kiểm tra trạng thái xác thực OTP
        status_key = f'status_{email}'
        otp_status = cache.get(status_key)

        if not otp_status:
            return Response({'error': 'OTP verification required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            Customers.objects.filter(email=email).update(pass_word=make_password(newpassword))
            res = Customers.objects.get(email=email)
            # Xóa trạng thái OTP sau khi cập nhật mật khẩu thành công
            cache.delete(status_key)

            return Response({'success': 'Password reset successfully'}, status=status.HTTP_200_OK)
        except Customers.DoesNotExist:
            return Response({'error': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)

