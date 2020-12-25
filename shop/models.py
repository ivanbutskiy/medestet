from django.db import models
from django.utils import timezone
from decimal import Decimal


class Currency(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название валюты', help_text='Например, "Евро" или "Доллар США"')
    exchange = models.DecimalField(blank=True, null=True, max_digits=5, decimal_places=2, verbose_name='Курс по отношению к гривне',
        help_text='Введите дробное число с двумя цифрами после точки (не запятой)')
    update_date = models.DateTimeField(auto_now=timezone.now, verbose_name='Когда обновлялся курс', help_text='Поле автоматически заполняется в момент последнего сохранения')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Валюта'
        verbose_name_plural = 'Валюты'
        ordering = ['-pk']


class Brand(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название бренда')
    country = models.CharField(max_length=50, verbose_name='Страна')
    brand_image = models.ImageField(upload_to='images/%Y-%m-%d/', blank=True, verbose_name='Логотип бренда')

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'
        ordering = ['-pk']

    def __str__(self):
        return self.title


class Category(models.Model):
    slug = models.SlugField(unique=True, db_index=True, verbose_name='Слаг', 
        help_text='Поле автозаполняемо и должно быть уникально')
    title = models.CharField(max_length=50, verbose_name='Название категории')
    # subtitle = models.CharField(max_length=200, verbose_name='Подзаголовок категории', 
    #     help_text='Выводится на лендинге в шапке. Макс. длина 200 символов')
    preview_category_icon = models.ImageField(upload_to='images/%Y-%m-%d/', null=True, 
        verbose_name='Маленькая картинка категории', 
        help_text='Можно использовать круглые иконки, главное, чтобы для всех категорий соблюдалась одна стилистика')
    is_published = models.BooleanField(blank=True, default=True, verbose_name='Опубликовано',
        help_text='Если категория опубликована, то она выводится в списке всех категорий на сайте. А соответственно, и ее товары')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['-pk']


class Product(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Фирма-производитель')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Категория')
    slug = models.SlugField(unique=True, db_index=True, verbose_name='Слаг', 
        help_text='Поле автозаполняемо и должно быть уникально')
    title = models.CharField(max_length=100, verbose_name='Название товара', 
        help_text='Максимальная длина 100 символов')
    short_description = models.CharField(max_length=300, verbose_name='Краткое описание товара', 
        help_text='Макс. длина 300 символов')
    
    description = models.TextField(verbose_name='Полное описание товара')

    price_certified = models.DecimalField(max_digits=6, decimal_places=0, null=True, 
        verbose_name='Стоимость в валюте для сертифицированных', 
        help_text='Показывается только для сертифицированных пользователей')
    price_guest = models.DecimalField(max_digits=6, decimal_places=0, default=0,             
        verbose_name='Стоимость в валюте для несертифицированных (для домашнего ухода)', 
        help_text='Если товар не предназначен для несертифицированных пользователей, оставьте  значение нулевым. Но, если оно заполнено, то в карточке товара будет показана стоимость для несертифицированных и незарегистрированных пользователей, а также будет возможность заказа этого товара')
    currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True, verbose_name='В какой валюте стоимость', help_text='При выводе для пользователя будет автоматически пересчитано в гривну')
    
    # new_product = models.BooleanField(default=False, blank=True, verbose_name='Новинка', 
    #     help_text='Если стоит галочка, на карточке товара будет показан лейбл, что это новинка')
    # old_price = models.PositiveIntegerField(blank=True, help_text='Больше, чем нынешняя', 
    #     verbose_name='Старая цена', 
    #     help_text='Указывайте старую цену, если товар акционный. Старая цена должна быть выше текущей. На карточке товара будет показана в перечеркнутом виде')

    header_image = models.ImageField(upload_to='images/shop/%Y-%m-%d/', verbose_name='Главная картинка')
    image_1 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 1')
    image_2 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 2')
    image_3 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 3')
    image_4 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 4')
    image_5 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 5')
    image_6 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 6')

    is_published = models.BooleanField(blank=True, default=True, verbose_name='Опубликовано', 
        help_text='Товар опубликован и показывается на сайте')

    @property
    def price_certified_uah(self):
        return self.price_certified * self.currency.exchange

    @property
    def price_guest_uah(self):
        return self.price_guest * self.currency.exchange

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-pk']
