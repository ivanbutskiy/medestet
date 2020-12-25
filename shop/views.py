from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from .paginators import ProductPaginator
from rest_framework.permissions import AllowAny
from .models import Product, Category, Currency, Brand
from .serializers import (
    ProductPreviewSerializer, 
    ProductSerializer, 
    CategorySerializer
)


class ProductsList(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPaginator

    def get_queryset(self):
        products = Product.objects.filter(is_published=True)
        return products


class ProductDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_published=True)
    lookup_field = 'slug'


class CategoriesListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_published=True)


class ProductsListByCategory(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPaginator

    def get_queryset(self):
        category_id = Category.objects.get(slug=self.kwargs['category_slug'])
        products = Product.objects.filter(category_id=category_id, is_published=True)
        return products
