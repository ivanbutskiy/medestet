from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from .models import Course, Person, Module, Lesson
from .serializers import CourseSerializer, CoursePreviewSerializer


class CoursesListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CoursePreviewSerializer
    queryset = Course.objects.filter(is_published=True)


class CourseDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = 'slug'