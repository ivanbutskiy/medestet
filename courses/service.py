from django.conf import settings
from django.core.mail import send_mail
from .models import Course


def send_register_mail(user, course):
    try:
        subject='Вы успешно зарегистрировались на курс!'
        message = (
            f'Вітаємо, {user.first_name}. '
            f'Дякуємо вам за реєстрацію на курс {course.title}.\n\n'
            f'Ми зробимо все, щоб ви отримали задоволення під час його проходження і якісні результати, '
            f'які будете успішно втілювати на практиці.\n\nЗ любов\'ю та повагою, команда Medestet.'
        )

        send_mail(
            subject=subject, 
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=True)
    except:
        pass


def send_admin_email(user, course):
    try:
        subject = f'Реєстрація на курс {course.title}'
        message = f'Користувач {user.first_name} {user.last_name} ({user.email}) зареєструвався та оплатив участь на курсі {course.title}.'
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True
        )
    except:
        pass
