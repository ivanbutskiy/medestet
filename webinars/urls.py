from django.urls import path
from .views import (
    WebinarsListView, 
    WebinarDetailView,
    CheckFreeServiceURL,
    CheckServiceURL,
    UserWebinars,
    UserWebinarDetail)


urlpatterns = [
    path('', WebinarsListView.as_view()),
    path('user-webinars/', UserWebinars.as_view()),
    path('<str:slug>/', WebinarDetailView.as_view()),
    path('order/check-free-service-url/', CheckFreeServiceURL.as_view()),
    path('user-webinars/<str:slug>/', UserWebinarDetail.as_view()),
    path('order/check-service-url/', CheckServiceURL.as_view()),
]
