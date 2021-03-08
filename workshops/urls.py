from django.urls import path
from .views import (
    WorkshopsListView, 
    WorkshopDetailView, 
    CheckOrder, 
    CheckPromocode, 
    UserWorkshopOrderList,
    LastWorkshopsView
    )


urlpatterns = [
    path('last/', LastWorkshopsView.as_view()),
    path('check-order/', CheckOrder.as_view()),
    path('check-promocode/<str:code>/', CheckPromocode.as_view()),
    path('user-workshops/', UserWorkshopOrderList.as_view()),
    path('', WorkshopsListView.as_view()),
    path('<str:slug>/', WorkshopDetailView.as_view()),
]
