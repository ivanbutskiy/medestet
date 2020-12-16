from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from .models import Webinar, Theme, Option
from .serializers import WebinarSerializer


class WebinarsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarSerializer
    queryset = Webinar.objects.filter(is_published=True)


class WebinarDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarSerializer
    queryset = Webinar.objects.all()
    lookup_field = 'slug'
