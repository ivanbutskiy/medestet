from django.urls import path
from .views import UserDetailView


urlpatterns = [
    path('user-info/', UserDetailView.as_view())
]
