from rest_framework import serializers
from .models import Product, Category, Brand, Currency


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
    price_uah = serializers.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        fields = '__all__'
        model = Product
