from django.urls import path
from .views import (
    ProductsList, 
    ProductDetailView, 
    CategoriesListView, 
    ProductsListByCategory
)


urlpatterns = [
    path('products/', ProductsList.as_view()),    # show all products list
    path('products/<str:slug>/', ProductDetailView.as_view()),    # show detail product
    path('categories/', CategoriesListView.as_view()),    # show categories list
    path('categories/<str:category_slug>/', ProductsListByCategory.as_view()),    # show products by category
]



# Элементы дизайна

# TODO добавить карту
# TODO топовые ролики на YouTube в блок Medetation (как на картинке с сайтом, что я Юле сбрасывал в Телегу)
# TODO в место проведения для семинаров добавить контакты для связи
# TODO топовые курсы, вебинары, семинары должны
# TODO Добавить социальные кнопки 


# Бизнес-логика

# TODO после подтверждения сертификата уведомить клиента, что его акк сертифицирован и цены доступны
# TODO выгружать участников семинаров, курсов и вебинаров
# TODO выгрузка пользователей в excel
# TODO дать права доступа сотрудникам: смотреть прайсы
# TODO о сертификации, о заказах на Viber
# TODO не надо уведомление о регистрации, добавить через почту восстановление пароля, уведомление о сертификации
# TODO добавить Facebook messenger чат-бот
# TODO подключить Google Analytics и Facebook pixels


# Магазин

# TODO добавить промокод
# TODO минимальный заказ для розницы (для домашки) от 250 грн. Товары для всех, не только для косметологов
# TODO накопительная система при покупке товаров (продукции) от 5к человек получает скидку 3%, а при 18к - 5%


# Юрисдикция

# TODO страница cookies и конфиденциальности, а также компонент при заходе на сайт для неаутентифицированных
# TODO добавить скролл с модальным окном для условий конфиденциальности и отдельную страницу


# Потом

# TODO при заказе товара скидка в стоимости при определенном количестве (не в процентах, а как на проме)
# TODO добавить OAuth
