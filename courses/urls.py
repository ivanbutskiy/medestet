from django.urls import path
from .views import CoursesListView, CourseDetailView


urlpatterns = [
    path('', CoursesListView.as_view()),
    path('<str:slug>/', CourseDetailView.as_view())
]
