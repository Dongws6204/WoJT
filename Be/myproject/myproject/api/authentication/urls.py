from django.urls import path
from .apiview import LoginAPIView,CheckAccountAPIView, GetInforCustomerRegisterAPIView, RegisterStatusAPIView, ResetPasswordAPIView, RequestOTPAPIView,VerifyOTPAPIView


urlpatterns = [

       #http://127.0.0.1:8000/api/authentication/login. 
       #Đăng nhập
       path('login', LoginAPIView.as_view(), name='login'),
       path('register', CheckAccountAPIView.as_view(), name='check'),
       path('register/status', RegisterStatusAPIView.as_view(), name='status-register'),
       path('register/save',GetInforCustomerRegisterAPIView.as_view(), name='save-register'),
       # Đường dẫn cho yêu cầu OTP
        path('request-otp/', RequestOTPAPIView.as_view(), name='request-otp'),

    # Đường dẫn cho xác minh OTP
        path('verify-otp/', VerifyOTPAPIView.as_view(), name='verify-otp'),

    # Đường dẫn cho việc đặt lại mật khẩu
    path('reset-password/', ResetPasswordAPIView.as_view(), name='reset-password'),


]
