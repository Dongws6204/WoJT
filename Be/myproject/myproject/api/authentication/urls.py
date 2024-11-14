from django.urls import path
from ...apiview import LoginAPIView


urlpatterns = [

       #http://127.0.0.1:8000/api/authentication/login. 
       #Đăng nhập
       path('login', LoginAPIView.as_view(), name='login'),
]
