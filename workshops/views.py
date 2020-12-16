from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from .models import Workshop, Lesson, Option
from .serializers import WorkshopSerializer


class WorkshopsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.filter(is_published=True)


class WorkshopDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()
    lookup_field = 'slug'
