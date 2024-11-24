from django.urls import path
from .apiview import CustomerAPIView

urlpatterns = [
    #http://127.0.0.1:8000/api/customers/13(id là số)
    #Trả về thông tin người dùng theo id
    path('<int:id>', CustomerAPIView.as_view(), name='list-customer'),
    # path('<int:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),

]
