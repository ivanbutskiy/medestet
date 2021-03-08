from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Webinar(models.Model):
    slug = models.SlugField(db_index=True, unique=True, 
        verbose_name='слаг', help_text='Поле автозаполняемо. Должно быть уникально')
    title = models.CharField(max_length=200, verbose_name='название вебинара', 
        help_text='Название вебинара. Служит заголовком на лендинге. Если вебинары по этой теме уже проводились, желательно, чтобы было в едином стиле с предыдущими. Макс. длина 200 символов')
    subtitle = models.CharField(max_length=250, verbose_name='подзаголовок',
        help_text='Макс. длина 250 символов')
    header_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='главное изображение',     
        help_text='Главное изображение, которое выводится в шапке лендинга')
    starting_date = models.DateTimeField(verbose_name='дата и время начала', help_text='Дата и время начала вебинара')
    
    description = models.TextField(verbose_name='описание вебинара')
    description_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='картинка к описанию')

    video = models.URLField(verbose_name='ссылка на видео трансляцию вебинара', blank=True, help_text='В формате "http://..."')
    video_record = models.URLField(verbose_name='ссылка на запись вебинара', blank=True, null=True, help_text='В формате "http://..."')

    is_published = models.BooleanField(default=True, verbose_name='опубликован на сайте')
    is_started = models.BooleanField(default=False, verbose_name='вебинар начат', help_text='Если начат, желательно снять галочку с "Опубликован на сайте", чтобы во время его проведения вебинар не показывался на сайте, а люди не могли записаться')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'вебинар'
        verbose_name_plural = 'вебинары'
        ordering = ['starting_date', '-id']


class Theme(models.Model):
    webinar = models.ForeignKey(Webinar, on_delete=models.CASCADE, 
        verbose_name='вебинар', help_text='К какому вебинару относится тема')
    title = models.CharField(max_length=150, verbose_name='название темы', help_text='Макс. длина 150 символов')
    short_description = models.CharField(max_length=200, verbose_name='краткое описание темы', help_text='Макс. длина 200 символов')
    is_published = models.BooleanField(default=True, verbose_name='опубликовано', 
        help_text='Тема показана на лендинге вебинара и в кабинете пользователя')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'тема'
        verbose_name_plural = 'темы'
        ordering = ['pk']


class Option(models.Model):
    TYPES = (
        ('free', 'Бесплатное участие'),
        ('only_watch', 'Оплата только за участие'),
        ('materials', 'С закупкой материалов')
    )

    webinar = models.ForeignKey(Webinar, on_delete=models.CASCADE, 
        verbose_name='вебинар', help_text='К какому вебинару относится')
    title = models.CharField(max_length=150, verbose_name='название', help_text='Развание варианта участия. Макс. длина 150 символов')
    description = models.CharField(max_length=300, verbose_name='описание варианта участия', help_text='Макс. длина 300 символов')
    option_type = models.CharField(max_length=100, verbose_name='тип варианта участия', choices=TYPES, null=True)
    price = models.DecimalField(blank=True, null=True, max_digits=5, decimal_places=0, verbose_name='стоимость варианта участия',
        help_text='Если вверху вы указали галочкой, что вебинар платный, введите целое число стоимости без дробной части')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'вариант участия'
        verbose_name_plural = 'варианты участия'

    
class WebinarOrder(models.Model):
    STATUS = (
        ('cancelled', 'Отменен'),
        ('apply', 'Принят'),
        ('paid', 'Оплачен')
    )

    order_reference = models.CharField(max_length=30, verbose_name='Уникальный номер заказа', null=True)
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Участник')
    webinar = models.ForeignKey(Webinar, on_delete=models.SET_NULL, null=True, verbose_name='На какой вебинар была запись')
    option = models.ForeignKey(Option, on_delete=models.SET_NULL, null=True, verbose_name='Выбранный вариант участия')
    status = models.CharField(max_length=30, verbose_name='Статус заказа', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сумма покупки', blank=True)
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата оформления записи')
    promocode = models.ForeignKey('WebinarPromocode', verbose_name='Промокод', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.order_reference}'
    
    class Meta:
        verbose_name = 'заявка на участие'
        verbose_name_plural = 'заявки на участие'
        ordering = ['-id']


class WebinarPromocode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набор символов длиной до 20 знаков')
    discount = models.PositiveSmallIntegerField(verbose_name='Процент скидки', help_text='Процент скидки, которую предоставляет промокод. Нужно ввести целое число (без символа процента). Минимальное значение - 0, максимальное - 100')
    webinars = models.ManyToManyField(Webinar, verbose_name='На какие вебинары распространяется промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активен и действует')

    def __str__(self):
        return self.code


    class Meta:
        verbose_name = 'промокод'
        verbose_name_plural = 'промокоды'
        ordering = ['-pk']
