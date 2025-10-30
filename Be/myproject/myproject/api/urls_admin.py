from django.urls import path
from .apiview import (ProductManagementAPIView, 
                      ProductDetailManagementAPIView,
                      GetNewOrderAPIView,
                      GetAllUsersAPIView, PortfolioView,
                      DeletePortAPIView, ProductListAPIView, ProductCreateAPIView,
                      ProductUpdateAPIView, ProductDeleteAPIView, ProductAndSalesAPIView,
                      OrderListView, UpdateOrderStatusView, DeleteUserAPIView)

urlpatterns = [
    path('products/', ProductManagementAPIView.as_view()),
    path('products/<int:pk>/', ProductManagementAPIView.as_view()),
    path('product-details/', ProductDetailManagementAPIView.as_view()),
    path('product-details/<int:pk>/', ProductDetailManagementAPIView.as_view()),
    path('order', GetNewOrderAPIView.as_view()),
    path('customer', GetAllUsersAPIView.as_view()),
    path('delete/<int:id',DeleteUserAPIView.as_view()),
    path('portfolios/', PortfolioView.as_view(), name='portfolio-list'),
    path('portfolios/delete/<int:id>', DeletePortAPIView.as_view(), name='delete-'),


    path('products/all', ProductListAPIView.as_view(), name='product_list'),
    path('products/add/', ProductCreateAPIView.as_view(), name='product_create'),
    path('products/update/<int:product_id>/', ProductUpdateAPIView.as_view(), name='product_update'),
    path('products/delete/<int:product_id>/', ProductDeleteAPIView.as_view(), name='product_delete'),


    path('sales/', ProductAndSalesAPIView.as_view(), name='products-sales'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/update/<int:order_id>/', UpdateOrderStatusView.as_view(), name='update-order-status'),
]
