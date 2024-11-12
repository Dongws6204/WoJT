# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey('Customers', models.DO_NOTHING, blank=True, null=True)
    total_amout = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    product = models.ForeignKey('Products', models.DO_NOTHING, blank=True, null=True)
    id_prod = models.ForeignKey('ProductDetail', models.DO_NOTHING, db_column='id_prod', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cart'


class ClothesEvaluate(models.Model):
    product = models.ForeignKey('Products', models.DO_NOTHING, blank=True, null=True)
    product_rate = models.FloatField(blank=True, null=True)
    sum_rate = models.IntegerField(blank=True, null=True)
    sum_star = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clothes_evaluate'


class Customers(models.Model):
    customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255, blank=True, null=True)
    birthday = models.DateField()
    role = models.IntegerField(blank=True, null=True, default=1)
    pass_word = models.CharField(max_length=500)
    user_name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'customers'


class Evaluate(models.Model):
    customer = models.ForeignKey(Customers, models.DO_NOTHING, blank=True, null=True)
    product = models.ForeignKey('Products', models.DO_NOTHING, blank=True, null=True)
    comments = models.CharField(max_length=200, blank=True, null=True)
    star = models.IntegerField(blank=True, null=True)
    date_posted = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evaluate'


class Object(models.Model):
    object_id = models.AutoField(primary_key=True)
    object_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'object'


class Orderdetail(models.Model):
    order = models.ForeignKey('Orders', models.DO_NOTHING, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    total_amout = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    product = models.ForeignKey('Products', models.DO_NOTHING, blank=True, null=True)
    id_prod = models.ForeignKey('ProductDetail', models.DO_NOTHING, db_column='id_prod', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orderdetail'


class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customers, models.DO_NOTHING, blank=True, null=True)
    order_date = models.DateField(blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders'


class Portfolio(models.Model):
    id_port = models.AutoField(primary_key=True)
    port_name = models.CharField(max_length=200, blank=True, null=True)
    object = models.ForeignKey(Object, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'portfolio'


class ProductDetail(models.Model):
    id_prod = models.AutoField(primary_key=True)
    product = models.ForeignKey('Products', models.DO_NOTHING, blank=True, null=True)
    size = models.IntegerField(blank=True, null=True)
    quantity_of_size = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_detail'


class Products(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=150, blank=True, null=True)
    quantity_stock = models.PositiveIntegerField(blank=True, null=True)
    id_port = models.ForeignKey(Portfolio, models.DO_NOTHING, db_column='id_port', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    img_1 = models.TextField(blank=True, null=True)
    ing_2 = models.TextField(blank=True, null=True)
    quantity_sold = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'products'


class Sales(models.Model):
    sale_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Products, models.DO_NOTHING, blank=True, null=True)
    discount = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sales'
