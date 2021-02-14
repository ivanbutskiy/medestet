from rest_framework import serializers
from .models import (
    Product, 
    Category, 
    Brand, 
    Currency, 
    PromoCode, 
    Payment,
    Delivery,
    Order,
    OrderItem
)


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Order


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Delivery


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Payment


class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = PromoCode


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Currency


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Brand


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    price_certified_uah = serializers.DecimalField(max_digits=7, decimal_places=2)
    price_guest_uah = serializers.DecimalField(max_digits=7, decimal_places=2)

    class Meta:
        fields = '__all__'
        model = Product


class ProductPreviewSerializer(serializers.ModelSerializer):
    price_certified_uah = serializers.DecimalField(max_digits=7, decimal_places=2)
    price_guest_uah = serializers.DecimalField(max_digits=7, decimal_places=2)

    class Meta:
        fields = ['slug', 'title', 'price_certified_uah', 'price_guest_uah', 'header_image', 'image_1']
        model = Product