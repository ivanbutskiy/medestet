from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Workshop(models.Model):
    slug = models.SlugField(db_index=True, unique=True, 
        verbose_name='слаг', help_text='Поле автозаполняемо. Должно быть уникально')
    title = models.CharField(max_length=200, verbose_name='Название семинара', 
        help_text='Название семинара. Служит заголовком на лендинге. Если семинары по этой теме уже проводились, желательно, чтобы было в едином стиле с предыдущими. Макс. длина 200 символов')
    subtitle = models.CharField(max_length=250, verbose_name='Подзаголовок',
        help_text='Макс. длина 250 символов')
    header_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='Главное изображение',     
        help_text='Главное изображение, которое выводится в шапке лендинга')
    starting_date = models.DateField(verbose_name='Дата начала', help_text='Дата начала семинара')
    
    description = models.TextField(verbose_name='Описание семинара')
    description_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='Картинка к описанию')

    location = models.TextField(verbose_name='Место проведения', help_text='Адрес места проведения Макс. длина 200 символов', null=True)
    location_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', null=True, verbose_name='Изображение локации', help_text='Скрин с гугл карты места проведения семинара или фото заведения')

    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')
    is_published = models.BooleanField(default=True, verbose_name='Опубликован на сайте')
    is_started = models.BooleanField(default=False, verbose_name='Семинар начат', help_text='Если начат, желательно снять галочку с "Опубликован на сайте", чтобы во время его проведения семинар не показывался на сайте, а люди не могли записаться')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'семинар'
        verbose_name_plural = 'семинары'
        ordering = ['starting_date']


class Lesson(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, 
        verbose_name='Семинар', help_text='К какому семинару относится занятие')
    title = models.CharField(max_length=150, verbose_name='Название занятия', help_text='Макс. длина 150 символов')
    short_description = models.CharField(max_length=200, verbose_name='Краткое описание занятия', help_text='Макс. длина 200 символов')
    starting_date = models.DateTimeField(verbose_name='Время и дата начала занятия')
    is_active = models.BooleanField(default=False, verbose_name='Занятие началось')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'занятие'
        verbose_name_plural = 'занятия'
        ordering = ['starting_date']


class Option(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, 
        verbose_name='Семинар', help_text='К какому семинару относится.')
    title = models.CharField(max_length=150, verbose_name='Название', help_text='Название варианта участия. Макс. длина 150 символов')
    description = models.CharField(max_length=300, verbose_name='Описание варианта участия', help_text='Макс. длина 300 символов')
    price = models.DecimalField(max_digits=5, decimal_places=0, verbose_name='Стоимость варианта участия',
        help_text='Введите целое число без дробной части')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'вариант участия'
        verbose_name_plural = 'варианты участия'


class WorkshopOrder(models.Model):
    STATUS = (
        ('cancelled', 'Отменен'),
        ('wait_paid', 'Ожидается оплата'),
        ('paid', 'Оплачен')
    )

    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Участник')
    workshop = models.ForeignKey(Workshop, on_delete=models.SET_NULL, null=True, verbose_name='Какой курс был приобретен')
    option = models.ForeignKey(Option, on_delete=models.SET_NULL, null=True, verbose_name='Выбранный вариант участия')
    status = models.CharField(max_length=30, verbose_name='Статус заказа', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сумма покупки')
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата оформления заявки')
    promocode = models.ForeignKey('WorkshopPromocode', verbose_name='Промокод', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.id}'
    
    class Meta:
        verbose_name = 'заявка на участие'
        verbose_name_plural = 'заявки на участие'
        ordering = ['-id']


class WorkshopPromocode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набор символов длиной до 20 знаков')
    discount = models.PositiveSmallIntegerField(verbose_name='Процент скидки', help_text='Процент скидки, которую предоставляет промокод. Нужно ввести целое число (без символа процента). Минимальное значение - 0, максимальное - 100')
    workshops = models.ManyToManyField(Workshop, verbose_name='На какие семинары распространяется промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активен и действует')

    def __str__(self):
        return self.code


    class Meta:
        verbose_name = 'промокод'
        verbose_name_plural = 'промокоды'
        ordering = ['-pk']