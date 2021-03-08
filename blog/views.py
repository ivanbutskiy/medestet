from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from .models import Post
from .serializers import PostDetailSerializer, PostPreviewSerializer


class PostsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PostPreviewSerializer
    queryset = Post.objects.filter(is_published=True)


class PostDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = PostDetailSerializer
    queryset = Post.objects.all()
    lookup_field = 'slug'
