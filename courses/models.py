from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, timedelta
from django.utils.timezone import utc


User = get_user_model()


class Subject(models.Model):
    title = models.CharField(max_length=200, verbose_name='Название категории')
    short_description = models.CharField(max_length=200, verbose_name='Краткое описание')
    students = models.ManyToManyField(User, blank=True, verbose_name='Студенты')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'субъект'
        verbose_name_plural = 'субъекты'


class Course(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, 
        verbose_name='Субъект', help_text='К какому субъекту относится данный поток курса')
    slug = models.SlugField(unique=True, db_index=True, 
        verbose_name='Слаг', help_text='Поле автозаполняемо. Должно быть уникально')
    title = models.CharField(max_length=200, verbose_name='Название курса', 
        help_text='Название курса. Служит заголовком на лендинге. Желательно, чтобы было в едином стиле с предыдущими потоками. Макс. длина 200 символов')
    subtitle = models.CharField(max_length=250, verbose_name='Подзаголовок',
        help_text='Макс. длина 250 символов')
    short_description = models.TextField(max_length=300, verbose_name='Краткое описание', 
        help_text='Краткое описание курса. Макс. длина 300 символов')
    header_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Главное изображение',     
        help_text='Главное изображение, которое выводится в шапке лендинга')
    preview_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Анонс картинка',
        help_text='Картинка, которая выводится в кратком описании курса в списке всех курсов')
    starting_date = models.DateField(verbose_name='дата начала', help_text='Дата начала курса')
    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    detail_description = models.TextField(verbose_name='Детальное описание курса')
    detail_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Картинка к детальному описанию курса')

    results = models.TextField(verbose_name='результат курса', help_text='Опишите, какие результаты получат участники курса после его окончания')

    certificate = models.BooleanField(default=False, verbose_name='Выдается сертификат', 
        help_text='Поставьте галочку, если по окончанию курса участникам выдается сертификат')
    certificate_image = models.ImageField(upload_to='courses/%Y-%m-%d/', null=True, blank=True, 
        verbose_name='Картинка сертификата', help_text='Если выше вы указали, что сертификат выдается, обязательно необходимо к данному курсу прикрепить его пример')

    price = models.DecimalField(max_digits=5, decimal_places=0, verbose_name='Стоимость',
        help_text='Введите целое число без дробной части')
    access_period = models.PositiveIntegerField(null=True, verbose_name='На сколько дней открыт доступ к модулям и урокам курса после покупки', help_text='Введите целое число, которое будет означать количество дней')
    is_published = models.BooleanField(default=True, verbose_name='Опубликован', 
        help_text='Курс опубликован на сайте, доступен к покупке и регистрации. Во время начала курса не забудьте снять галочку')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = 'курсы'
        ordering = ['-pk']

    
class Person(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Курс')
    image_person = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Картинка к типу персонажа')
    person = models.CharField(max_length=50, verbose_name='Тип персонажа')
    person_detail = models.CharField(max_length=100, verbose_name='Краткое описание персонажа')
    
    def __str__(self):
        return self.person

    class Meta:
        verbose_name = 'персонаж ЦА'
        verbose_name_plural = 'персонажи ЦА'


class Module(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название модуля', help_text='Макс. длина 150 символов')
    description = models.TextField(verbose_name='Описание модуля', blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Курс', 
        help_text='К какому курсу относится модуль')
    is_active = models.BooleanField(default=False, verbose_name='Доступен к прохождению')


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'модуль'
        verbose_name_plural = 'модули'
        ordering = ['pk']


class Lesson(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название урока', help_text='Макс. длина 150 символов')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, 
        verbose_name='модуль', help_text='К какому модулю относится урок')
    description = models.TextField(blank=True, verbose_name='Описание урока')
    video = models.URLField(verbose_name='Ссылка на видео трансляцию', blank=True, help_text='В формате "http://..."')
    video_record = models.URLField(verbose_name='Ссылка на запись урока', blank=True, null=True, help_text='В формате "http://..."')
    materials = models.URLField(verbose_name='Ссылка на материалы', blank=True)
    is_active = models.BooleanField(default=False, verbose_name='Доступен к прохождению')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'урок'
        verbose_name_plural = 'уроки'
        ordering = ['pk']


class CoursePromocode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набор символов длиной до 20 знаков')
    discount = models.PositiveSmallIntegerField(verbose_name='Процент скидки', help_text='Процент скидки, которую предоставляет промокод. Нужно ввести целое число (без символа процента). Минимальное значение - 0, максимальное - 100')
    courses = models.ManyToManyField(Course, verbose_name='На какие курсы распространяется промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активен и действует')

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'промокод'
        verbose_name_plural = 'промокоды'
        ordering = ['-pk']


class CourseOrder(models.Model):

    STATUS = (
        ('cancelled', 'Отменен'),
        ('wait_paid', 'Ожидается оплата'),
        ('paid', 'Оплачен')
    )

    order_reference = models.CharField(max_length=30, verbose_name='Уникальный номер заказа')
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Участник')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, verbose_name='Какой курс был приобретен')
    status = models.CharField(max_length=30, verbose_name='Статус заказа', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сумма покупки')
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата покупки курса')
    

    @property
    def ending_date(self):
        days = self.course.access_period
        result = self.payment_date + timedelta(days=days)
        return f'{result.year}.{result.month}.{result.day}'

    
    @property
    def days_left(self):
        days = self.course.access_period
        ending_date = self.payment_date + timedelta(days=days)
        now_date = datetime.utcnow().replace(tzinfo=utc)
        result = ending_date - now_date
        return result.days


    def __str__(self):
        return f'{self.order_reference}'
    
    class Meta:
        verbose_name = 'заявка на курс'
        verbose_name_plural = 'заявки на курсы'
        ordering = ['-payment_date']
