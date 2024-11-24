from django.urls import path
from .apiview import LoginAPIView,CheckAccountAPIView, GetInforCustomerRegisterAPIView, RegisterStatusAPIView


urlpatterns = [

       #http://127.0.0.1:8000/api/authentication/login. 
       #Đăng nhập
       path('login', LoginAPIView.as_view(), name='login'),
       path('register', CheckAccountAPIView.as_view(), name='check'),
       path('register/status', RegisterStatusAPIView.as_view(), name='status-register'),
       path('register/save',GetInforCustomerRegisterAPIView.as_view(), name='save-register'),


]
