from django.urls import path
from .views import WebinarsListView, WebinarDetailView


urlpatterns = [
    path('', WebinarsListView.as_view()),
    path('<str:slug>/', WebinarDetailView.as_view()),
]
