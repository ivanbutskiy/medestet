from django.urls import path
from .views import UserDetailView, UserUpdateView


urlpatterns = [
    path('user-info/', UserDetailView.as_view()),
    path('update/<int:id>/', UserUpdateView.as_view()),
]
