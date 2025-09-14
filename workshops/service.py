from django.conf import settings
from django.core.mail import send_mail
from .models import Workshop


def send_register_mail(user, workshop):
    try:
        subject='Ви успішно зареєструвалися на семінар!'
        message = f'''Доброго дня, {user.first_name}. Дякуємо вам за реєстрацію на семінар {workshop.title}.\n\nМи зробимо все, щоб ви отримали задоволення під час його проходження та якісні результати, які будете успішно втілювати на практиці.\n\nЧекайте на подальші повідомлення.\n\nЗ любов'ю та повагою, команда Medestet.'''

        send_mail(
            subject=subject, 
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=True)
    except:
        return None


def send_admin_email(user, workshop):
    try:
        subject = f'Реєстрація на семінар {workshop.title}'
        message = f'Користувач {user.first_name} {user.last_name} ({user.email}) зареєструвався на участь у семінарі {workshop.title}. Будь ласка, зв\'яжіться з ним.'
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True
        )
    except:
        return None
