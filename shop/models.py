from django.db import models
from django.utils import timezone
from decimal import Decimal
from django.contrib.auth import get_user_model


User = get_user_model()


class Currency(models.Model):
    title = models.CharField(max_length=50, verbose_name='Назва валюти', help_text='Наприклад, «Євро» або «Долар США»')
    exchange = models.DecimalField(blank=True, null=True, max_digits=5, decimal_places=2, verbose_name='Курс по відношенню до гривні',
        help_text='Введіть дробове число з двома цифрами після крапки (не коми)')
    update_date = models.DateTimeField(auto_now=timezone.now, verbose_name='Коли оновлювався курс', help_text='Поле автоматически заполняется в момент последнего сохранения')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Валюта'
        verbose_name_plural = 'Валюти'
        ordering = ['-pk']


class Brand(models.Model):
    title = models.CharField(max_length=50, verbose_name='Назва бренду')
    country = models.CharField(max_length=50, verbose_name='Країна')
    brand_image = models.ImageField(upload_to='images/%Y-%m-%d/', blank=True, verbose_name='Логотип бренду')

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренди'
        ordering = ['-pk']

    def __str__(self):
        return self.title


class Category(models.Model):
    slug = models.SlugField(unique=True, db_index=True, verbose_name='Слаг', 
        help_text='Поле заповнюється автоматично і має бути унікальним')
    title = models.CharField(max_length=50, verbose_name='Назва категорії')
    # subtitle = models.CharField(max_length=200, verbose_name='Підзаголовок категорії',
    #     help_text='Виводиться на лендінгу в шапці. Макс. довжина 200 символів')
    preview_category_icon = models.ImageField(upload_to='images/%Y-%m-%d/', null=True, 
        verbose_name='Маленька картинка категорії',
        help_text='Можна використовувати круглі іконки, головне, щоб для всіх категорій дотримувалася одна стилістика')
    is_published = models.BooleanField(blank=True, default=True, verbose_name='Опубліковано',
        help_text='Якщо категорія опублікована, то вона виводиться в списку всіх категорій на сайті. А відповідно, і її товари')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категорія'
        verbose_name_plural = 'Категорії'
        ordering = ['-pk']


class Product(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Фірма-виробник')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Категорія')
    slug = models.SlugField(unique=True, db_index=True, verbose_name='Слаг', 
        help_text='Поле заповнюється автоматично і має бути унікальним')
    title = models.CharField(max_length=100, verbose_name='Назва товару',
        help_text='Максимальна довжина 100 символів')
    short_description = models.CharField(max_length=300, verbose_name='Короткий опис товару',
        help_text='Макс. довжина 300 символів')
    
    description = models.TextField(verbose_name='Повний опис товару')
    volume = models.IntegerField(verbose_name='Обсяг продукції в мілілітрах', help_text='Введіть ціле число', blank=True)

    price_certified = models.DecimalField(max_digits=7, decimal_places=2, null=True, 
        verbose_name='Вартість у валюті для сертифікованих користувачів',
        help_text='Показується тільки сертифікованим користувачам')
    new_price_certified = models.DecimalField(max_digits=7, decimal_places=2, null=True, 
        default=0.00, verbose_name='Нова знижена вартість у валюті для сертифікованих користувачів',
        help_text='Нова знижена вартість показується тільки сертифікованим користувачам. Якщо нова вартість зі знижкою не передбачена, залиште значення нульовим. Якщо поле заповнене, буде показана нова знижена вартість, і за нею сертифікований косметолог буде купувати товар')

    price_guest = models.DecimalField(max_digits=7, decimal_places=2, default=0.00, 
        verbose_name='Вартість у валюті для несертифікованих (для догляду вдома)',
        help_text='Якщо товар не призначений для несертифікованих користувачів, залиште  значення нульовим. Але, якщо воно заповнене, то в картці товару буде показана вартість для несертифікованих і незареєстрованих користувачів, а також буде можливість замовлення цього товару')
    new_price_guest = models.DecimalField(max_digits=7, decimal_places=2, default=0.00, 
        null=True, verbose_name='Нова знижена вартість у валюті для несертифікованих (для домашнього догляду)', help_text='Якщо для несертифікованих користувачів по цьому товару не передбачена нова знижка, залиште значення нульовим')

    currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True, verbose_name='В какой валюте стоимость', help_text='При виведенні для користувача буде автоматично перераховано в гривню')

    header_image = models.ImageField(upload_to='images/shop/%Y-%m-%d/', verbose_name='Головна картинка')
    image_1 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 1')
    image_2 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 2')
    image_3 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 3')
    image_4 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 4')
    image_5 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 5')
    image_6 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='Картинка 6')

    is_published = models.BooleanField(blank=True, default=True, verbose_name='Опубліковано',
        help_text='Товар опублікований і відображається на сайті')

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
        verbose_name_plural = 'Товари'
        ordering = ['-pk']


class PromoCode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набір символів довжиною до 20 знаків')
    discount = models.PositiveSmallIntegerField(verbose_name='Процент знижки', help_text='Відсоток знижки, яку надає промокод. Потрібно ввести ціле число (без символу відсотка). Мінімальне значення - 0, максимальне - 100')
    products = models.ManyToManyField(Product, verbose_name='На які продукти поширюється промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активний і діє')

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Промокод'
        verbose_name_plural = 'Промокоди'
        ordering = ['-pk']


class Delivery(models.Model):
    title = models.CharField(max_length=50, verbose_name='Назва служби доставки',
        help_text='Наприклад: Нова пошта')
    image = models.ImageField(upload_to='images/shop/%Y-%m-%d/', verbose_name='Логотип служби доставки')
    is_published = models.BooleanField(default=True, verbose_name='Опубліковано',
        help_text='Якщо опубліковано, спосіб доставки буде доступний користувачам при оформленні замовлення')
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Служба доставки'
        verbose_name_plural = 'Служби доставки'
        ordering = ['-pk']


class Payment(models.Model):

    PAYMENT_CHOICES = (
        ('WFP', 'WayForPay'),
        ('ANY', 'Інший способ')
    )

    title = models.CharField(max_length=50, verbose_name='Назва способу оплати',
        help_text='Наприклад: "WayForPay"')
    payment_type = models.CharField(max_length=30, choices=PAYMENT_CHOICES, verbose_name='Тип способу оплати',
        help_text="Зверніть увагу, що тільки для WayForPay буде доступна автоматична онлайн-оплата замовлення. Інші типи оплати будуть тільки виводитися на сторінці оформлення замовлення як альтернативні, і оплатити замовлення людина зможе тільки після того, як менеджер з нею зв'яжеться по телефону")
    
    MERCHANT_LOGIN = models.CharField(max_length=100, blank=True, verbose_name='MERCHANT LOGIN', 
        help_text='Тільки для WayForPay. Це значення ви можете отримати в ЛК WayForPay в налаштуваннях магазину у вкладці «Реквізити мерчанта»')
    MERCHANT_SECRET_KEY = models.CharField(max_length=200, blank=True, verbose_name='MERCHANT SECRET KEY', 
        help_text='Тільки для WayForPay. Це значення ви можете отримати в ЛК WayForPay в налаштуваннях магазину у вкладці «Реквізити мерчанта»')

    logo = models.ImageField(upload_to='images/shop/%Y-%m-%d/', verbose_name='Логотип способу оплати')
    short_description = models.CharField(max_length=300, verbose_name='Короткий опис',
        help_text='Короткий опис системи оплати. На сторінці сайту буде показано користувачеві, якщо даний спосіб оплати опублікований. Наприклад: «WayForPay - автоматична оплата з повною оплатою товару за допомогою картки Visa/MasterCard». Максимальна довжина 300 символів.')
    # prepayment = models.PositiveSmallIntegerField(verbose_name='Процент предоплаты', help_text='Это значение нужно указывать только для WayForPay. Значение должно быть числом от 0 до 100. Какой процент укажете, такой человек размер предоплаты и внесет во время автоматической оплаты после оформления заказа')
    is_published = models.BooleanField(default=True, verbose_name='Опубліковано',
        help_text='Якщо стоїть галочка, то даний спосіб оплати буде опублікований на сайті в момент оформлення замовлення')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Спосіб оплати'
        verbose_name_plural = 'Способи оплати'


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, verbose_name='До якого замовлення відноситься')
    product = models.ForeignKey(Product, verbose_name='Товар', on_delete=models.CASCADE, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True, 
        verbose_name='За якою вартістю в гривні був куплений товар',
        help_text='Вартість розраховується виходячи з того, чи замовляв сертифікований користувач чи ні')
    count = models.PositiveSmallIntegerField(verbose_name='Количество')

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name = 'Позиція в замовленні'
        verbose_name_plural = 'Позиції в замовленні'


class Order(models.Model):

    STATUS = (
        ('cancelled', 'Скасовано'),
        ('wait_paid', 'Очікується оплата'),
        ('paid', 'Оплачено'),
        ('sent', 'Відправлено'),
        ('done', 'Виконано')
    )
    order_reference = models.CharField(max_length=30, null=True, verbose_name='Унікальний номер замовлення')
    consumer = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Покупець', help_text="Якщо людина зареєстрована на сайті, буде вказано її ім'я та прізвище")

    status = models.CharField(max_length=30, verbose_name='Статус замовлення', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сума замовлення')
    promocode = models.ForeignKey(PromoCode, blank=True, null=True, verbose_name='Промокод', on_delete=models.SET_NULL)
    
    last_name = models.CharField(max_length=30, verbose_name='Прізвище')
    first_name = models.CharField(max_length=30, verbose_name="Ім'я")
    phone = models.CharField(max_length=30, verbose_name='Телефон')
    email = models.EmailField(verbose_name='E-mail')
    region = models.CharField(max_length=50, verbose_name='Область')
    city = models.CharField(max_length=50, verbose_name='Місто')

    delivery = models.ForeignKey(Delivery, null=True, on_delete=models.SET_NULL, verbose_name='Спосіб доставки')
    delivery_office = models.CharField(max_length=200, verbose_name='Адреса та номер відділення обраної служби доставки')


    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата оформлення замовлення')
    is_done = models.BooleanField(default=False, verbose_name='Виконано')

    def __str__(self):
        return f'{self.id}'

    class Meta:
        verbose_name = 'замовлення'
        verbose_name_plural = 'замовлення'
        ordering = ['-adding_date']
