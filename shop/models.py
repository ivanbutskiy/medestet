from django.db import models
from django.utils import timezone


class Currency(models.Model):
    title = models.CharField(max_length=50, verbose_name='название валюты', help_text='Например, "Евро" или "Доллар США".')
    exchange = models.DecimalField(blank=True, null=True, max_digits=5, decimal_places=2, verbose_name='курс по отношению к гривне',
        help_text='Введите дробное число с двумя цифрами после точки (не запятой).')
    update_date = models.DateTimeField(auto_now=timezone.now, verbose_name='когда обновлялся курс', help_text='Поле автоматически заполняется в момент последнего сохранения.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'валюта'
        verbose_name_plural = 'валюты'


class Brand(models.Model):
    title = models.CharField(max_length=50, verbose_name='название бренда')
    country = models.CharField(max_length=50, verbose_name='страна')
    brand_image = models.ImageField(upload_to='images/%Y-%m-%d/', blank=True, verbose_name='логотип бренда')

    class Meta:
        verbose_name = 'бренд'
        verbose_name_plural = 'бренды'

    def __str__(self):
        return self.title


class Category(models.Model):
    slug = models.SlugField(unique=True, db_index=True, verbose_name='слаг', 
        help_text='Поле автозаполняемо и должно быть уникально.')
    title = models.CharField(max_length=50, verbose_name='название категории')
    subtitle = models.CharField(max_length=200, verbose_name='подзаголовок категории', help_text='выводится на лендинге в шапке. Макс. длина 200 символов.')
    category_image = models.ImageField(upload_to='images/%Y-%m-%d/', 
        verbose_name='картинка категории в шапке лендинга')
    preview_category_image = models.ImageField(upload_to='images/%Y-%m-%d/', 
        verbose_name='маленькая картинка категории')
    is_published = models.BooleanField(blank=True, default=True, verbose_name='опубликовано')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='фирма-производитель')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='категория')
    slug = models.SlugField(unique=True, db_index=True, verbose_name='слаг', 
        help_text='Поле автозаполняемо и должно быть уникально.')
    title = models.CharField(max_length=100, verbose_name='название товара', 
        help_text='Максимальная длина 100 символов')
    short_description = models.CharField(max_length=300, verbose_name='краткое описание товара', 
        help_text='Макс. длина 300 символов.')
    
    description = models.TextField(verbose_name='полное описание товара')

    price = models.DecimalField(max_digits=6, decimal_places=0, verbose_name='стоимость в валюте')
    currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True, verbose_name='в какой валюте стоимость', help_text='При выводе для пользователя будет автоматически пересчитано в гривну.')
    new_product = models.BooleanField(default=False, blank=True, verbose_name='новинка')
    old_price = models.PositiveIntegerField(blank=True, help_text='Больше, чем нынешняя', verbose_name='старая цена')
    
    header_image = models.ImageField(upload_to='images/shop/%Y-%m-%d/', verbose_name='главная картинка')
    image_1 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='картинка 1')
    image_2 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='картинка 2')
    image_3 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='картинка 3')
    image_4 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='картинка 4')
    image_5 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='картинка 5')
    image_6 = models.ImageField(blank=True, upload_to='images/shop/%Y-%m-%d/', verbose_name='картинка 6')

    is_published = models.BooleanField(blank=True, default=True, verbose_name='опубликовано')

    @property
    def price_uah(self):
        return self.price * self.currency.exchange

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
