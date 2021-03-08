from django.urls import path
from .views import VideoListView, VideoDetailView, LastVideosView


urlpatterns = [
    path('', VideoListView.as_view()),
    path('last/', LastVideosView.as_view()),
    path('<str:slug>/', VideoDetailView.as_view())
]
