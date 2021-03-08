from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from .models import News
from .serializers import NewsPreviewSerializer, NewsDetailSerializer


class LastNewsView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = NewsPreviewSerializer
    queryset = News.objects.filter(is_published=True)[:5]


class NewsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = NewsPreviewSerializer
    queryset = News.objects.filter(is_published=True)


class NewsDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = NewsDetailSerializer
    queryset = News.objects.all()
    lookup_field = 'slug'
