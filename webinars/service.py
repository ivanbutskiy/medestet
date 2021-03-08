from django.conf import settings
from django.core.mail import send_mail
from .models import Webinar


def send_register_mail(user, webinar):
    try:
        subject='Вы успешно зарегистрировались на вебинар!'
        message = f'''Здравствуйте, {user.first_name}. Благодарим вас за регистрацию на вебинар {webinar.title}.\n\nМы сделаем все, чтобы вы получили удовольствие во время его прохождения и качественные результаты, которые будете успешно воплощать на практике.\n\nС любовью и уважением, команда Medestet.'''

        send_mail(
            subject=subject, 
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=True)
    except:
        return None


def send_admin_email(user, webinar):
    try:
        subject = f'Регистрация на вебинар {webinar.title}'
        message = f'Пользователь {user.first_name} {user.last_name} ({user.email}) зарегистрировался на участие в вебинаре {webinar.title}. Пожалуйста, свяжитесь с ним.'
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True
        )
    except:
        return None
