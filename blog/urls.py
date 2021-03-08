from django.urls import path
from .views import PostsListView, PostDetailView


urlpatterns = [
    path('', PostsListView.as_view()),
    path('<str:slug>/', PostDetailView.as_view())
]
