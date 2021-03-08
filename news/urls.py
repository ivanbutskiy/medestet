from django.urls import path
from .views import NewsListView, NewsDetailView, LastNewsView


urlpatterns = [
    path('', NewsListView.as_view()),
    path('last/', LastNewsView.as_view()),
    path('<str:slug>/', NewsDetailView.as_view())
]
