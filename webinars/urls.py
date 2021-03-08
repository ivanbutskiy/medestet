from django.urls import path
from .views import (
    WebinarsListView, 
    WebinarDetailView,
    CheckServiceURL,
    UserWebinarsOrderList,
    UserWebinarDetail,
    CheckPromocode,
    CheckOrder,
    LastWebinarsView
    )


urlpatterns = [
    path('', WebinarsListView.as_view()),
    path('last/', LastWebinarsView.as_view()),
    path('check-order/', CheckOrder.as_view()),
    path('check-promocode/<str:code>/', CheckPromocode.as_view()),
    path('user-webinars/', UserWebinarsOrderList.as_view()),
    path('<str:slug>/', WebinarDetailView.as_view()),
    path('user-webinars/<str:slug>/', UserWebinarDetail.as_view()),
    path('order/check-service-url/', CheckServiceURL.as_view()),
]
