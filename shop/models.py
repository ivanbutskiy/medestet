from django.db import models
from django.utils import timezone
from decimal import Decimal
from django.contrib.auth import get_user_model


User = get_user_model()


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
    volume = models.IntegerField(verbose_name='Объем продукции в миллилитрах', help_text='Введите целое число', blank=True)

    price_certified = models.DecimalField(max_digits=7, decimal_places=2, null=True, 
        verbose_name='Стоимость в валюте для сертифицированных пользователей', 
        help_text='Показывается только сертифицированным пользователям')
    new_price_certified = models.DecimalField(max_digits=7, decimal_places=2, null=True, 
        default=0.00, verbose_name='Новая скидочная стоимость в валюте для сертифицированных пользователей',
        help_text='Новая скидочная стоимость показывается только сертифицированным пользователям. Если новая стоимость по скидке не предусмотрена, оставьте значение нулевым. Если поле заполнено, будет показана новая скидочная стоимость, и по ней сертифицированный косметолог будет приобретать товар')

    price_guest = models.DecimalField(max_digits=7, decimal_places=2, default=0.00, 
        verbose_name='Стоимость в валюте для несертифицированных (для домашнего ухода)', 
        help_text='Если товар не предназначен для несертифицированных пользователей, оставьте  значение нулевым. Но, если оно заполнено, то в карточке товара будет показана стоимость для несертифицированных и незарегистрированных пользователей, а также будет возможность заказа этого товара')
    new_price_guest = models.DecimalField(max_digits=7, decimal_places=2, default=0.00, 
        null=True, verbose_name='Новая скидочная стоимость в валюте для несертифицированных (для домашнего ухода)', help_text='Если для несертифицированных пользователей по этому товару не предусмотрена новая скидочная стоимость, оставьте значение нулевым')

    currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True, verbose_name='В какой валюте стоимость', help_text='При выводе для пользователя будет автоматически пересчитано в гривну')

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

    @property
    def new_price_certified_uah(self):
        return self.new_price_certified * self.currency.exchange

    @property
    def new_price_guest_uah(self):
        return self.new_price_guest * self.currency.exchange

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-pk']


class PromoCode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набор символов длиной до 20 знаков')
    discount = models.PositiveSmallIntegerField(verbose_name='Процент скидки', help_text='Процент скидки, которую предоставляет промокод. Нужно ввести целое число (без символа процента). Минимальное значение - 0, максимальное - 100')
    products = models.ManyToManyField(Product, verbose_name='На какие продукты распространяется промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активен и действует')

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Промокод'
        verbose_name_plural = 'Промокоды'
        ordering = ['-pk']


class Delivery(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название службы доставки',
        help_text='Например: Новая почта')
    image = models.ImageField(upload_to='images/shop/%Y-%m-%d/', verbose_name='Логотип службы доставки')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано',
        help_text='Если опубликовано, способ доставки будет доступен пользователям при оформлении заказа')
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Служба доставки'
        verbose_name_plural = 'Службы доставки'
        ordering = ['-pk']


class Payment(models.Model):

    PAYMENT_CHOICES = (
        ('WFP', 'WayForPay'),
        ('ANY', 'Другой способ')
    )

    title = models.CharField(max_length=50, verbose_name='Название способа оплаты', 
        help_text='Например: "WayForPay"')
    payment_type = models.CharField(max_length=30, choices=PAYMENT_CHOICES, verbose_name='Тип способа оплаты',
        help_text='Обратите внимание, что только для WayForPay будет доступна автоматическая онлайн-оплата заказа. Другие типы оплаты будут только выводиться на странице оформления заказа как альтернативные, и оплатить заказ человек сможет только после того, как менеджер с ним свяжется по телефону')
    
    MERCHANT_LOGIN = models.CharField(max_length=100, blank=True, verbose_name='MERCHANT LOGIN', 
        help_text='Только для WayForPay. Это значение вы можете получить в ЛК WayForPay в настройках магазина во вкладке "Реквизиты мерчанта"')
    MERCHANT_SECRET_KEY = models.CharField(max_length=200, blank=True, verbose_name='MERCHANT SECRET KEY', 
        help_text='Только для WayForPay. Это значение вы можете получить в ЛК WayForPay в настройках магазина во вкладке "Реквизиты мерчанта"')

    logo = models.ImageField(upload_to='images/shop/%Y-%m-%d/', verbose_name='Логотип способа оплаты')
    short_description = models.CharField(max_length=300, verbose_name='Краткое описание', 
        help_text='Краткое описание системы оплаты. На странице сайта будет показано пользователю, если данный способ оплаты опубликован. Например: "WayForPay - автоматическая оплата с полной оплатой товара с помощью карты Visa/MasterCard". Максимальная длина 300 символов')
    # prepayment = models.PositiveSmallIntegerField(verbose_name='Процент предоплаты', help_text='Это значение нужно указывать только для WayForPay. Значение должно быть числом от 0 до 100. Какой процент укажете, такой человек размер предоплаты и внесет во время автоматической оплаты после оформления заказа')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано', 
        help_text='Если стоит галочка, то данный способ оплаты будет опубликован на сайте в момент оформления заказа')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Способ оплаты'
        verbose_name_plural = 'Способы оплаты'


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, verbose_name='К какому заказу относится')
    product = models.ForeignKey(Product, verbose_name='Товар', on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True, 
        verbose_name='По какой стоимости в гривне был куплен товар', 
        help_text='Стоимость высчитывается исходя из того, заказывал сертифицированный пользователь или нет')
    count = models.PositiveSmallIntegerField(verbose_name='Количество')

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name = 'Позиция в заказе'
        verbose_name_plural = 'Позиции в заказе'


class Order(models.Model):

    STATUS = (
        ('cancelled', 'Отменен'),
        ('wait_paid', 'Ожидается оплата'),
        ('paid', 'Оплачен'),
        ('sent', 'Отправлен'),
        ('done', 'Выполнен')
    )
    order_reference = models.CharField(max_length=30, null=True, verbose_name='Уникальный номер заказа')
    consumer = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Покупатель', help_text='Если человек зарегистрирован на сайте, будет указано его имя и фамилия')

    status = models.CharField(max_length=30, verbose_name='Статус заказа', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сумма заказа')
    promocode = models.ForeignKey(PromoCode, blank=True, null=True, verbose_name='Промокод', on_delete=models.SET_NULL)
    
    last_name = models.CharField(max_length=30, verbose_name='Фамилия')
    first_name = models.CharField(max_length=30, verbose_name='Имя')
    phone = models.CharField(max_length=30, verbose_name='Телефон')
    email = models.EmailField(verbose_name='E-mail')
    region = models.CharField(max_length=50, verbose_name='Область')
    city = models.CharField(max_length=50, verbose_name='Город')

    delivery = models.ForeignKey(Delivery, null=True, on_delete=models.SET_NULL, verbose_name='Способ доставки')
    delivery_office = models.CharField(max_length=200, verbose_name='Адрес и номер отделения выбранной службы доставки')


    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата оформления заказа')
    is_done = models.BooleanField(default=False, verbose_name='Выполнен')

    def __str__(self):
        return f'{self.id}'

    class Meta:
        verbose_name = 'заказ'
        verbose_name_plural = 'заказы'
        ordering = ['-adding_date']
