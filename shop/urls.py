from django.urls import path
from .views import CategoriesListView, ProductListView


urlpatterns = [
    path('', CategoriesListView.as_view()),
    path('<str:category_slug>/', ProductListView.as_view()),
]
