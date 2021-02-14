from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone 


User = get_user_model()


class Subject(models.Model):
    title = models.CharField(max_length=200, verbose_name='название категории')
    short_description = models.CharField(max_length=200, verbose_name='краткое описание')
    students = models.ManyToManyField(User, blank=True, verbose_name='студенты')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'субъект'
        verbose_name_plural = 'субъекты'


class Course(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, 
        verbose_name='субъект', help_text='К какому субъекту относится данный поток курса.')
    slug = models.SlugField(unique=True, db_index=True, 
        verbose_name='слаг', help_text='Поле автозаполняемо. Должно быть уникально.')
    title = models.CharField(max_length=200, verbose_name='название курса', 
        help_text='Название курса. Служит заголовком на лендинге. Желательно, чтобы было в едином стиле с предыдущими потоками. Макс. длина 200 символов.')
    subtitle = models.CharField(max_length=250, verbose_name='подзаголовок',
        help_text='Макс. длина 250 символов.')
    short_description = models.TextField(max_length=300, verbose_name='краткое описание', 
        help_text='Краткое описание курса. Макс. длина 300 символов')
    header_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='главное изображение',     
        help_text='Главное изображение, которое выводится в шапке лендинга.')
    preview_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='анонс картинка',
        help_text='Картинка, которая выводится в кратком описании курса в списке всех курсов.')
    starting_date = models.DateField(verbose_name='дата начала', help_text='Дата начала курса')
    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='дата добавления')

    detail_description = models.TextField(verbose_name='детальное описание курса')
    detail_image = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='картинка к детальному описанию курса')

    results = models.TextField(verbose_name='результат курса', help_text='Опишите, какие результаты получат участники курса после его окончания.')

    certificate = models.BooleanField(default=False, verbose_name='выдается сертификат', 
        help_text='Поставьте галочку, если по окончанию курса участникам выдается сертификат')
    certificate_image = models.ImageField(upload_to='courses/%Y-%m-%d/', null=True, blank=True, 
        verbose_name='картинка сертификата', help_text='Если выше вы указали, что сертификат выдается, обязательно необходимо к данному курсу прикрепить его пример.')

    students = models.ManyToManyField(User, blank=True, verbose_name='участники курса')
    price = models.DecimalField(max_digits=5, decimal_places=0, verbose_name='стоимость',
        help_text='Введите целое число без дробной части')
    is_published = models.BooleanField(default=True, verbose_name='опубликован', 
        help_text='Курс опубликован на сайте, доступен к покупке и регистрации. Во время начала курса не забудьте снять галочку.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = 'курсы'
        ordering = ['-pk']

    
class Person(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='курс')
    image_person = models.ImageField(upload_to='courses/%Y-%m-%d/', verbose_name='картинка к типу персонажа')
    person = models.CharField(max_length=50, verbose_name='тип персонажа')
    person_detail = models.CharField(max_length=100, verbose_name='краткое описание персонажа')
    
    def __str__(self):
        return self.person

    class Meta:
        verbose_name = 'персонаж ЦА'
        verbose_name_plural = 'персонажи ЦА'


class Module(models.Model):
    title = models.CharField(max_length=150, verbose_name='название модуля', help_text='Макс. длина 150 символов')
    description = models.TextField(verbose_name='описание модуля', blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='курс', 
        help_text='К какому курсу относится модуль.')
    is_published = models.BooleanField(default=True, verbose_name='опубликован', 
        help_text='Модуль показан на лендинге курса и в кабинете пользователя.')
    is_active = models.BooleanField(default=False, verbose_name='Доступен к прохождению.')


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'модуль'
        verbose_name_plural = 'модули'
        ordering = ['pk']


class Lesson(models.Model):
    title = models.CharField(max_length=150, verbose_name='название урока', help_text='Макс. длина 150 символов.')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, 
        verbose_name='модуль', help_text='К какому модулю относится урок.')
    description = models.TextField(blank=True, verbose_name='описание урока')
    video = models.URLField(verbose_name='ссылка на видео трансляцию', blank=True, help_text='В формате "http://..."')
    video_record = models.URLField(verbose_name='ссылка на запись урока', blank=True, null=True, help_text='В формате "http://..."')
    materials = models.URLField(verbose_name='ссылка на материалы', blank=True)
    is_published = models.BooleanField(default=True, verbose_name='опубликован', 
        help_text='Урок показан на лендинге курса и в кабинете пользователя.')
    is_active = models.BooleanField(default=False, verbose_name='доступен к прохождению.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'урок'
        verbose_name_plural = 'уроки'
        ordering = ['pk']
