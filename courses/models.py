from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, timedelta
from django.utils.timezone import utc


User = get_user_model()


class Subject(models.Model):
    title = models.CharField(max_length=200, verbose_name='Назва категорії')
    short_description = models.CharField(max_length=200, verbose_name='Короткий опис')
    students = models.ManyToManyField(User, blank=True, verbose_name='Студенти')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "суб'єкт"
        verbose_name_plural = "суб'єкти"


class Course(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, 
        verbose_name="Суб'єкт", help_text='До якого суб\'єкта відноситься даний потік курсу')
    slug = models.SlugField(unique=True, db_index=True, 
        verbose_name='Слаг', help_text='Поле заповнюється автоматично. Повинно бути унікальним')
    title = models.CharField(max_length=200, verbose_name='Назва курсу',
        help_text='Назва курсу. Служить заголовком на лендінгу. Бажано, щоб була в єдиному стилі з попередніми потоками. Макс. довжина 200 символів')
    subtitle = models.CharField(max_length=250, verbose_name='Підзаголовок',
        help_text='Макс. довжина 250 символів')
    short_description = models.TextField(max_length=300, verbose_name='Короткий опис',
        help_text='Короткий опис курсу. Макс. довжина 300 символів')
    header_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Головне зображення',
        help_text='Головне зображення, яке виводиться в шапці лендингу')
    preview_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Анонс картинка',
        help_text='Зображення, яке відображається в короткому описі курсу в списку всіх курсів')
    starting_date = models.DateField(verbose_name='дата початку', help_text='Дата початку курсу')
    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата додавання')

    detail_description = models.TextField(verbose_name='Детальний опис курсу')
    detail_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Картинка до детального опису курсу')

    results = models.TextField(verbose_name='результат курсу', help_text='Опишіть, які результати отримають учасники курсу після його закінчення')

    certificate = models.BooleanField(default=False, verbose_name='Видається сертифікат',
        help_text='Поставте галочку, якщо після закінчення курсу учасникам видається сертифікат')
    certificate_image = models.ImageField(upload_to='courses/%Y-%m-%d/', null=True, blank=True, 
        verbose_name='Зображення сертифіката', help_text='Якщо вище ви вказали, що сертифікат видається, обов\'язково необхідно до даного курсу прикріпити його зразок')

    price = models.DecimalField(max_digits=5, decimal_places=0, verbose_name='Вартість',
        help_text='Введіть ціле число без дробової частини')
    access_period = models.PositiveIntegerField(null=True, verbose_name='На скільки днів відкритий доступ до модулів і уроків курсу після покупки', help_text='Введіть ціле число, яке буде означати кількість днів')
    is_published = models.BooleanField(default=True, verbose_name='Опубліковано',
        help_text='Курс опублікований на сайті, доступний для придбання та реєстрації. Під час початку курсу не забудьте зняти галочку')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = 'курси'
        ordering = ['-pk']

    
class Person(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Курс')
    image_person = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='Картинка до типу персонажа')
    person = models.CharField(max_length=50, verbose_name='Тип персонажа')
    person_detail = models.CharField(max_length=100, verbose_name='Короткий опис персонажа')
    
    def __str__(self):
        return self.person

    class Meta:
        verbose_name = 'персонаж ЦА'
        verbose_name_plural = 'персонажі ЦА'


class Module(models.Model):
    title = models.CharField(max_length=150, verbose_name='Назва модуля', help_text='Макс. довжина 150 символів')
    description = models.TextField(verbose_name='Опис модуля', blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Курс', 
        help_text='До якого курсу відноситься модуль')
    is_active = models.BooleanField(default=False, verbose_name='Доступний для проходження')


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'модуль'
        verbose_name_plural = 'модулі'
        ordering = ['pk']


class Lesson(models.Model):
    title = models.CharField(max_length=150, verbose_name='Назва уроку', help_text='Макс. довжина 150 символів')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, 
        verbose_name='модуль', help_text='До якого модуля відноситься урок')
    description = models.TextField(blank=True, verbose_name='Опис уроку')
    video = models.URLField(verbose_name='Посилання на відео трансляцію', blank=True, help_text='В форматі "http://..."')
    video_record = models.URLField(verbose_name='Посилання на запис уроку', blank=True, null=True, help_text='В форматі "http://..."')
    materials = models.URLField(verbose_name='Посилання на матеріали', blank=True)
    is_active = models.BooleanField(default=False, verbose_name='Доступний для проходження')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'урок'
        verbose_name_plural = 'уроки'
        ordering = ['pk']


class CoursePromocode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набір символів довжиною до 20 знаків')
    discount = models.PositiveSmallIntegerField(verbose_name='Відсоток знижки', help_text='Відсоток знижки, яку надає промокод. Потрібно ввести ціле число (без символу відсотка). Мінімальне значення - 0, максимальне - 100')
    courses = models.ManyToManyField(Course, verbose_name='На які курси поширюється промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активний і діє')

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'промокод'
        verbose_name_plural = 'промокоди'
        ordering = ['-pk']


class CourseOrder(models.Model):

    STATUS = (
        ('cancelled', 'Скасовано'),
        ('wait_paid', 'Очікується оплата'),
        ('paid', 'Сплачено')
    )

    order_reference = models.CharField(max_length=30, verbose_name='Унікальний номер замовлення')
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Учасник')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, verbose_name='Який курс був придбаний')
    status = models.CharField(max_length=30, verbose_name='Статус замовлення', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сума покупки')
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата придбання курсу')
    

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
        verbose_name_plural = 'заявки на курси'
        ordering = ['-payment_date']
