from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Webinar(models.Model):
    slug = models.SlugField(db_index=True, unique=True, 
        verbose_name='слаг', help_text='Поле заповнюється автоматично. Повинно бути унікальним')
    title = models.CharField(max_length=200, verbose_name='назва вебінару',
        help_text='Назва вебінару. Слугує заголовком на лендінгу. Якщо вебінари на цю тему вже проводилися, бажано, щоб вона була в єдиному стилі з попередніми. Макс. довжина 200 символів.')
    subtitle = models.CharField(max_length=250, verbose_name='підзаголовок',
        help_text='Макс. довжина 250 символів')
    header_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='головне зображення',
        help_text='Головне зображення, яке виводиться в шапці лендингу')
    starting_date = models.DateTimeField(verbose_name='дата і час початку', help_text='Дата і час початку вебінару')
    
    description = models.TextField(verbose_name='опис вебінару')
    description_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='картинка до опису')

    video = models.URLField(verbose_name='посилання на відео трансляцію вебінару', blank=True, help_text='В форматі "http://..."')
    video_record = models.URLField(verbose_name='посилання на запис вебінару', blank=True, null=True, help_text='В форматі "http://..."')

    is_published = models.BooleanField(default=True, verbose_name='опубліковано на сайті')
    is_started = models.BooleanField(default=False, verbose_name='вебінар розпочато', help_text='Якщо розпочато, бажано зняти галочку з «Опубліковано на сайті», щоб під час його проведення вебінар не показувався на сайті, а люди не могли записатися')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'вебінар'
        verbose_name_plural = 'вебінари'
        ordering = ['starting_date', '-id']


class Theme(models.Model):
    webinar = models.ForeignKey(Webinar, on_delete=models.CASCADE, 
        verbose_name='вебінар', help_text='До якого вебінару відноситься тема')
    title = models.CharField(max_length=150, verbose_name='назва теми', help_text='Макс. довжина 150 символів')
    short_description = models.CharField(max_length=200, verbose_name='короткий опис теми', help_text='Макс. довжина 200 символів')
    is_published = models.BooleanField(default=True, verbose_name='опубліковано',
        help_text='Тема показана на лендінгу вебінару та в кабінеті користувача')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'тема'
        verbose_name_plural = 'теми'
        ordering = ['pk']


class Option(models.Model):
    TYPES = (
        ('free', 'Безкоштовна участь'),
        ('only_watch', 'Оплата тільки за участь'),
        ('materials', 'З закупівлею матеріалів')
    )

    webinar = models.ForeignKey(Webinar, on_delete=models.CASCADE, 
        verbose_name='вебінар', help_text='До якого вебінару відноситься')
    title = models.CharField(max_length=150, verbose_name='назва', help_text='Развлечение варианта участия. Макс. длина 150 символов')
    description = models.CharField(max_length=300, verbose_name='опис варіанту участі', help_text='Макс. довжина 300 символів')
    option_type = models.CharField(max_length=100, verbose_name='тип варіанту участі', choices=TYPES, null=True)
    price = models.DecimalField(blank=True, null=True, max_digits=5, decimal_places=0, verbose_name='вартість варіанту участі',
        help_text='Якщо вгорі ви вказали галочкою, що вебінар платний, введіть ціле число вартості без дробової частини')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'варіант участі'
        verbose_name_plural = 'варіанти участі'

    
class WebinarOrder(models.Model):
    STATUS = (
        ('cancelled', 'Скасовано'),
        ('apply', 'Прийнято'),
        ('paid', 'Оплачено')
    )

    order_reference = models.CharField(max_length=30, verbose_name='Унікальний номер замовлення', null=True)
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Учасник')
    webinar = models.ForeignKey(Webinar, on_delete=models.SET_NULL, null=True, verbose_name='На який вебінар була запис')
    option = models.ForeignKey(Option, on_delete=models.SET_NULL, null=True, verbose_name='Обраний варіант участі')
    status = models.CharField(max_length=30, verbose_name='Статус замовлення', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сума покупки', blank=True)
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата оформлення запису')
    promocode = models.ForeignKey('WebinarPromocode', verbose_name='Промокод', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.order_reference}'
    
    class Meta:
        verbose_name = 'заявка на участь'
        verbose_name_plural = 'заявки на участь'
        ordering = ['-id']


class WebinarPromocode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набір символів довжиною до 20 знаків')
    discount = models.PositiveSmallIntegerField(verbose_name='Відсоток знижки', help_text='Відсоток знижки, яку надає промокод. Потрібно ввести ціле число (без символу відсотка). Мінімальне значення - 0, максимальне - 100')
    webinars = models.ManyToManyField(Webinar, verbose_name='На які вебінари поширюється промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активний і діє')

    def __str__(self):
        return self.code


    class Meta:
        verbose_name = 'промокод'
        verbose_name_plural = 'промокоди'
        ordering = ['-pk']
