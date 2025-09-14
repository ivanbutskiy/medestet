from django.conf import settings
from django.core.mail import send_mail
from .models import Webinar


def send_register_mail(user, webinar):
    try:
        subject='Ви успішно зареєструвалися на вебінар!'
        message = f'''Доброго дня, {user.first_name}. Дякуємо вам за реєстрацію на вебінар {webinar.title}.\n\nМи зробимо все, щоб ви отримали задоволення під час його проходження та якісні результати, які будете успішно втілювати на практиці.\n\nЗ любов'ю та повагою, команда Medestet.'''

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
        subject = f'Реєстрація на вебінар {webinar.title}'
        message = f'Користувач {user.first_name} {user.last_name} ({user.email}) зареєструвався на участь у вебінарі {webinar.title}. Будь ласка, зв\'яжіться з ним.'
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True
        )
    except:
        return None
