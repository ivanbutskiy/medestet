from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from .models import Video
from .serializers import VideoPreviewSerializer, VideoDetailSerializer


class LastVideosView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = VideoPreviewSerializer
    queryset = Video.objects.filter(is_published=True)[:10]


class VideoListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = VideoPreviewSerializer
    queryset = Video.objects.filter(is_published=True)


class VideoDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = VideoDetailSerializer
    queryset = Video.objects.all()
    lookup_field = 'slug'
