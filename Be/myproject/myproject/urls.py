"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers 
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



router = routers.DefaultRouter()

urlpatterns = [
    # router = router,
    path('api/customers/', include('myproject.api.customers.urls')),
    path('api/authentication/', include('myproject.api.authentication.urls')),
    path('api/products/', include('myproject.api.products.urls')),
    path('api/orders/', include('myproject.api.orders.urls')),
    path('api/ship/', include('myproject.api.shipAdress.urls')),
    path('api/admin/', include('myproject.api.admin.urls')),
    path('api/reviews/',include('myproject.api.review.urls')),

]
