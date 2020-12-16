from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Workshop(models.Model):
    slug = models.SlugField(db_index=True, unique=True, 
        verbose_name='слаг', help_text='Поле автозаполняемо. Должно быть уникально.')
    title = models.CharField(max_length=200, verbose_name='название семинара', 
        help_text='Название семинара. Служит заголовком на лендинге. Если семинары по этой теме уже проводились, желательно, чтобы было в едином стиле с предыдущими. Макс. длина 200 символов.')
    subtitle = models.CharField(max_length=250, verbose_name='подзаголовок',
        help_text='Макс. длина 250 символов.')
    header_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='главное изображение',     
        help_text='Главное изображение, которое выводится в шапке лендинга.')
    starting_date = models.DateField(verbose_name='дата начала', help_text='Дата начала семинара')
    
    description = models.TextField(verbose_name='описание семинара')
    description_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='картинка к описанию')

    location = models.CharField(max_length=200, verbose_name='место проведения', help_text='Адрес места проведения. Макс. длина 200 символов.')
    location_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='изображение локации', help_text='Скрин с гугл карты места проведения семинара или фото заведения.')

    students = models.ManyToManyField(User, blank=True, verbose_name='участники семинара')

    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='дата добавления')
    is_published = models.BooleanField(default=True, verbose_name='опубликован на сайте')
    is_started = models.BooleanField(default=False, verbose_name='семинар начат', help_text='Если начат, желательно снять галочку с "Опубликован на сайте", чтобы во время его проведения семинар не показывался на сайте, а люди не могли записаться.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'семинар'
        verbose_name_plural = 'семинары'
        ordering = ['starting_date']


class Lesson(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, 
        verbose_name='семинар', help_text='К какому семинару относится занятие.')
    title = models.CharField(max_length=150, verbose_name='название занятия', help_text='Макс. длина 150 символов.')
    short_description = models.CharField(max_length=200, verbose_name='краткое описание занятия', help_text='Макс. длина 200 символов.')
    starting_date = models.DateTimeField(verbose_name='время и дата начала занятия')
    is_published = models.BooleanField(default=True, verbose_name='опубликовано', 
        help_text='Занятие показано на лендинге семинара и в кабинете пользователя.')
    is_active = models.BooleanField(default=False, verbose_name='занятие началось')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'занятие'
        verbose_name_plural = 'занятия'
        ordering = ['starting_date']


class Option(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, 
        verbose_name='семинар', help_text='К какому семинару относится.')
    title = models.CharField(max_length=150, verbose_name='название', help_text='Развание варианта участия. Макс. длина 150 символов.')
    description = models.CharField(max_length=300, verbose_name='описание варианта участия', help_text='Макс. длина 300 символов.')
    price = models.DecimalField(max_digits=5, decimal_places=0, verbose_name='стоимость варианта участия',
        help_text='Введите целое число без дробной части.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'вариант участия'
        verbose_name_plural = 'варианты участия'