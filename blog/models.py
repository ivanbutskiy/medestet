from django.db import models


class Post(models.Model):
    slug = models.SlugField(unique=True, db_index=True, 
        verbose_name='Слаг', help_text='Поле автозаполняемо. Должно быть уникально')
    title = models.CharField(max_length=200, verbose_name='название публикации. Макс. длина 200 символов')
    subtitle = models.CharField(max_length=300, verbose_name='подзаголовок. Макс. длина 300 символов', help_text='Не обязательно к заполнению', blank=True)
    image = models.ImageField(upload_to='blog/%Y-%m-%d/', verbose_name='изображение',     
        help_text='Главное изображение, которое выводится в миниатюре и шапке лендинга')
    text = models.TextField(verbose_name='текст публикации')
    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='дата добавления публикации')
    update_date = models.DateTimeField(auto_now=True, verbose_name='дата обновления публикации')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано и показано на сайте')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'публикация'
        verbose_name_plural = 'публикации'
        ordering = ['-update_date', '-adding_date']
