from django.urls import path
from .views import (
    ProductsList, 
    ProductDetailView, 
    CategoriesListView, 
    ProductsListByCategory,
    PromoCodeDetailView,
    PaymentListView,
    DeliveryListView,
    OrderRegisterView,
    CheckServiceURL,
    UserShoppingList,
    LastProductsView
)


urlpatterns = [
    path('last/', LastProductsView.as_view()),    # show all products list
    path('user-shopping-list/', UserShoppingList.as_view()),    # show all products list
    path('products/', ProductsList.as_view()),    # show all products list
    path('products/<str:slug>/', ProductDetailView.as_view()),    # show detail product
    path('categories/', CategoriesListView.as_view()),    # show categories list
    path('categories/<str:category_slug>/', ProductsListByCategory.as_view()),    # show products by category
    path('check-promocode/<str:code>/', PromoCodeDetailView.as_view()),
    path('payments/', PaymentListView.as_view()),
    path('delivery/', DeliveryListView.as_view()),
    path('order/new/', OrderRegisterView.as_view()),
    path('order/check-service-url/', CheckServiceURL.as_view()),
]


# Перед развертыванием!!!

# TODO Перед выгрузкой на фронте обязательно вставить merchantAccount
# TODO туда же добавить returnUrl, merchantDomainName и serviceUrl


# Элементы дизайна

# TODO добавить карту
# TODO топовые ролики на YouTube в блок Medetation (как на картинке с сайтом, что я Юле сбрасывал в Телегу)
# TODO в место проведения для семинаров добавить контакты для связи
# TODO Добавить социальные кнопки 


# Бизнес-логика

# TODO выгружать участников семинаров, курсов и вебинаров
# TODO выгрузка пользователей в excel
# TODO дать права доступа сотрудникам: смотреть прайсы
# TODO не надо уведомление о регистрации, добавить через почту восстановление пароля, уведомление о сертификации
# TODO добавить Facebook messenger чат-бот
# TODO подключить Google Analytics и Facebook pixels


# Юрисдикция

# TODO страница cookies и конфиденциальности, а также компонент при заходе на сайт для неаутентифицированных
# TODO добавить скролл с модальным окном для условий конфиденциальности и отдельную страницу


# Потом

# TODO при заказе товара скидка в стоимости при определенном количестве (не в процентах, а как на проме)
# TODO добавить OAuth
