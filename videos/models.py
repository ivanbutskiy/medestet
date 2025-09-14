from django.db import models


class Video(models.Model):
    slug = models.SlugField(unique=True, db_index=True, 
        verbose_name='Слаг', help_text='Поле заповнюється автоматично. Повинно бути унікальним')
    title = models.CharField(max_length=200, verbose_name='назва відео. Макс. довжина 200 символів')
    subtitle = models.CharField(max_length=300, verbose_name='підзаголовок. Макс. довжина 300 символів', help_text='Не обов\'язково заповнювати', blank=True)
    image = models.ImageField(upload_to='blog/%Y-%m-%d/', verbose_name='зображення',
        help_text='Головне зображення, яке виводиться в мініатюрі та шапці лендінгу')
    text = models.TextField(verbose_name='текст до відеозапису', help_text='Буде відображатися на сторінці під самим відео. Поле не обов\'язкове для заповнення', blank=True)

    video = models.URLField(verbose_name='посилання на відео з YouTube', help_text='В форматі "http://..."')

    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='дата додавання відеозапису')
    update_date = models.DateTimeField(auto_now=True, verbose_name='дата оновлення відеозапису')
    is_published = models.BooleanField(default=True, verbose_name='Опубліковано та показано на сайті')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'відеозапис'
        verbose_name_plural = 'відеозаписи'
        ordering = ['-update_date', '-adding_date']
