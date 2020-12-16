from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from .models import Product, Category, Currency, Brand
from .serializers import CategorySerializer, ProductSerializer


class CategoriesListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_published=True)


class ProductListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        category = Category.objects.get(slug=self.kwargs['category_slug'])
        products = Product.objects.filter(is_published=True, category=category)
        return products
