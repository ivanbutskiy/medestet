from django.urls import path
from .views import WorkshopsListView, WorkshopDetailView


urlpatterns = [
    path('', WorkshopsListView.as_view()),
    path('<str:slug>/', WorkshopDetailView.as_view()),
]
