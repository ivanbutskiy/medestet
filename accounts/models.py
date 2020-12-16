from django.db import models


from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('Введите корректный e-mail адрес.')
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(email, first_name, last_name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    last_name = models.CharField(max_length=20, blank=True, verbose_name='фамилия')
    first_name = models.CharField(max_length=20, verbose_name='имя')
    patronym = models.CharField(max_length=20, blank=True, verbose_name='отчество')
    email = models.EmailField(max_length=50, unique=True, db_index=True, verbose_name='e-mail')
    photo = models.ImageField(upload_to='photos/%Y-%m-%d/', null=True, blank=True, verbose_name='фото')
    phone = models.CharField(max_length=20, verbose_name='телефон', blank=True)
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='дата регистрации')
    certificate = models.ImageField(upload_to='certificates/%Y/%m/%d/', blank=True)
    is_certified = models.BooleanField(default=False, verbose_name='сертифицирован')
    is_active = models.BooleanField(default=True, verbose_name='аккаунт активен')
    is_staff = models.BooleanField(default=False, verbose_name='сотрудник')

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'
        ordering = ['-register_date']
