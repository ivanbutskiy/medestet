from django.urls import path
from .views import (
    CoursesListView, 
    CourseDetailView, 
    CheckServiceURL,
    UserCourses,
    UserCourseDetail,
    LessonDetailView,
    CourseOrderView,
    CheckPromocode,
    LastCoursesView
    )


urlpatterns = [
    path('', CoursesListView.as_view()),
    path('last/', LastCoursesView.as_view()),
    path('user-courses/', UserCourses.as_view()),
    path('user-courses/<str:slug>/', UserCourseDetail.as_view()),
    path('lesson-detail/<int:id>/', LessonDetailView.as_view()),
    path('order/check-service-url/', CheckServiceURL.as_view()),
    path('order/check/<str:slug>/', CourseOrderView.as_view()),
    path('check-promocode/<str:code>/', CheckPromocode.as_view()),
    path('<str:slug>/', CourseDetailView.as_view()),
]
