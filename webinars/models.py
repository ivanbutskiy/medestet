from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Webinar(models.Model):
    slug = models.SlugField(db_index=True, unique=True, 
        verbose_name='слаг', help_text='Поле автозаполняемо. Должно быть уникально.')
    title = models.CharField(max_length=200, verbose_name='название вебинара', 
        help_text='Название вебинара. Служит заголовком на лендинге. Если вебинары по этой теме уже проводились, желательно, чтобы было в едином стиле с предыдущими. Макс. длина 200 символов.')
    subtitle = models.CharField(max_length=250, verbose_name='подзаголовок',
        help_text='Макс. длина 250 символов.')
    header_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='главное изображение',     
        help_text='Главное изображение, которое выводится в шапке лендинга.')
    starting_date = models.DateTimeField(verbose_name='дата и время начала', help_text='Дата и время начала вебинара')
    
    description = models.TextField(verbose_name='описание вебинара')
    description_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='картинка к описанию')

    video = models.URLField(verbose_name='ссылка на видео трансляцию вебинара', blank=True, help_text='В формате "http://..."')
    video_record = models.URLField(verbose_name='ссылка на запись вебинара', blank=True, null=True, help_text='В формате "http://..."')

    students = models.ManyToManyField(User, blank=True, verbose_name='участники вебинара')

    is_published = models.BooleanField(default=True, verbose_name='опубликован на сайте')
    is_started = models.BooleanField(default=False, verbose_name='вебинар начат', help_text='Если начат, желательно снять галочку с "Опубликован на сайте", чтобы во время его проведения вебинар не показывался на сайте, а люди не могли записаться.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'вебинар'
        verbose_name_plural = 'вебинары'
        ordering = ['starting_date', '-id']


class Theme(models.Model):
    webinar = models.ForeignKey(Webinar, on_delete=models.CASCADE, 
        verbose_name='семинар', help_text='К какому вебинару относится тема.')
    title = models.CharField(max_length=150, verbose_name='название темы', help_text='Макс. длина 150 символов.')
    short_description = models.CharField(max_length=200, verbose_name='краткое описание темы', help_text='Макс. длина 200 символов.')
    is_published = models.BooleanField(default=True, verbose_name='опубликовано', 
        help_text='Тема показана на лендинге вебинара и в кабинете пользователя.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'тема'
        verbose_name_plural = 'темы'
        ordering = ['pk']


class Option(models.Model):
    webinar = models.ForeignKey(Webinar, on_delete=models.CASCADE, 
        verbose_name='вебинар', help_text='К какому вебинару относится.')
    title = models.CharField(max_length=150, verbose_name='название', help_text='Развание варианта участия. Макс. длина 150 символов.')
    description = models.CharField(max_length=300, verbose_name='описание варианта участия', help_text='Макс. длина 300 символов.')
    is_paid = models.BooleanField(default=False, verbose_name='Платный вариант участия', help_text='Если это платный вариант участия, поставьте галочку, чтобы была подключена возможность оплаты.')
    price = models.DecimalField(blank=True, null=True, max_digits=5, decimal_places=0, verbose_name='стоимость варианта участия',
        help_text='Если вверху вы указали галочкой, что вебинар платный, введите целое число стоимости без дробной части.')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'вариант участия'
        verbose_name_plural = 'варианты участия'