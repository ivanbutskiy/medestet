from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Workshop(models.Model):
    slug = models.SlugField(db_index=True, unique=True, 
        verbose_name='слаг', help_text='Поле заповнюється автоматично. Повинно бути унікальним')
    title = models.CharField(max_length=200, verbose_name='Назва семінару',
        help_text='Назва семінару. Служить заголовком на лендінгу. Якщо семінари на цю тему вже проводилися, бажано, щоб вона була в єдиному стилі з попередніми. Макс. довжина 200 символів')
    subtitle = models.CharField(max_length=250, verbose_name='Підзаголовок',
        help_text='Макс. довжина 250 символів')
    header_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='Головне зображення',
        help_text='Головне зображення, яке виводиться в шапці лендингу')
    starting_date = models.DateField(verbose_name='Дата початку', help_text='Дата початку семінару')
    
    description = models.TextField(verbose_name='Опис семінару')
    description_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', verbose_name='Картинка до опису')

    location = models.TextField(verbose_name='Місце проведення', help_text='Адреса місця проведення Макс. довжина 200 символів', null=True)
    location_image = models.ImageField(upload_to='workshops/%Y-%m-%d/', null=True, verbose_name='Зображення локації', help_text='Скрін з гугл-мапи місця проведення семінару або фото закладу')

    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата додавання')
    is_published = models.BooleanField(default=True, verbose_name='Опубліковано на сайті')
    is_started = models.BooleanField(default=False, verbose_name='Семінар розпочато', help_text='Якщо розпочато, бажано зняти галочку з «Опубліковано на сайті», щоб під час його проведення семінар не показувався на сайті, а люди не могли записатися')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'семінар'
        verbose_name_plural = 'семінари'
        ordering = ['starting_date']


class Lesson(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, 
        verbose_name='Семінар', help_text='До якого семінару відноситься заняття')
    title = models.CharField(max_length=150, verbose_name='Назва заняття', help_text='Макс. довжина 150 символів')
    short_description = models.CharField(max_length=200, verbose_name='Короткий опис заняття', help_text='Макс. довжина 200 символів')
    starting_date = models.DateTimeField(verbose_name='Час і дата початку занять')
    is_active = models.BooleanField(default=False, verbose_name='Заняття розпочалося')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'заняття'
        verbose_name_plural = 'заняття'
        ordering = ['starting_date']


class Option(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, 
        verbose_name='Семінар', help_text='До якого семінару відноситься.')
    title = models.CharField(max_length=150, verbose_name='Назва', help_text='Назва варіанту участі. Макс. довжина 150 символів')
    description = models.CharField(max_length=300, verbose_name='Опис варіанту участі', help_text='Макс. довжина 300 символів')
    price = models.DecimalField(max_digits=5, decimal_places=0, verbose_name='Вартість варіанту участі',
        help_text='Введіть ціле число без дробової частини')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'варіант участі'
        verbose_name_plural = 'варіанти участі'


class WorkshopOrder(models.Model):
    STATUS = (
        ('cancelled', 'Скасовано'),
        ('wait_paid', 'Очікується оплата'),
        ('paid', 'Оплачено')
    )

    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='Учасник')
    workshop = models.ForeignKey(Workshop, on_delete=models.SET_NULL, null=True, verbose_name='Який курс був придбаний')
    option = models.ForeignKey(Option, on_delete=models.SET_NULL, null=True, verbose_name='Обраний варіант участі')
    status = models.CharField(max_length=30, verbose_name='Статус замовлення', choices=STATUS)
    order_sum = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Сума покупки')
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата оформлення заявки')
    promocode = models.ForeignKey('WorkshopPromocode', verbose_name='Промокод', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.id}'
    
    class Meta:
        verbose_name = 'заявка на участь'
        verbose_name_plural = 'заявки на участь'
        ordering = ['-id']


class WorkshopPromocode(models.Model):
    code = models.CharField(max_length=20, verbose_name='Промокод', help_text='Набір символів довжиною до 20 знаків')
    discount = models.PositiveSmallIntegerField(verbose_name='Відсоток знижки', help_text='Відсоток знижки, яку надає промокод. Потрібно ввести ціле число (без символу відсотка). Мінімальне значення - 0, максимальне - 100')
    workshops = models.ManyToManyField(Workshop, verbose_name='На які семінари поширюється промокод')
    is_active = models.BooleanField(default=True, verbose_name='Промокод активний і діє')

    def __str__(self):
        return self.code


    class Meta:
        verbose_name = 'промокод'
        verbose_name_plural = 'промокоди'
        ordering = ['-pk']
