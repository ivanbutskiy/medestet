from django.db import models


class Post(models.Model):
    slug = models.SlugField(unique=True, db_index=True, 
        verbose_name='Слаг', help_text='Поле заповнюється автоматично. Повинно бути унікальним')
    title = models.CharField(max_length=200, verbose_name='назва публікації. Макс. довжина 200 символів')
    subtitle = models.CharField(max_length=300, verbose_name='підзаголовок. Макс. довжина 300 символів', help_text='Не обов\'язково заповнювати', blank=True)
    image = models.ImageField(upload_to='blog/%Y-%m-%d/', verbose_name='зображення',
        help_text='Головне зображення, яке виводиться в мініатюрі та шапці лендінгу')
    text = models.TextField(verbose_name='текст публикації')
    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='дата додавання публікації')
    update_date = models.DateTimeField(auto_now=True, verbose_name='дата оновлення публікації')
    is_published = models.BooleanField(default=True, verbose_name='Опубліковано та показано на сайті')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'публикація'
        verbose_name_plural = 'публикації'
        ordering = ['-update_date', '-adding_date']
