from django.conf import settings
from django.core.mail import send_mail
from .models import Course


def send_register_mail(user, course):
    try:
        subject='Вы успешно зарегистрировались на курс!'
        message = f'''Здравствуйте, {user.first_name}. Благодарим вас за регистрацию на курс {course.title}.\n\nМы сделаем все, чтобы вы получили удовольствие во время его прохождения и качественные результаты, которые будете успешно воплощать на практике.\n\nС любовью и уважением, команда Medestet.'''

        send_mail(
            subject=subject, 
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=True)
    except:
        return None


def send_admin_email(user, course):
    try:
        subject = f'Регистрация на курс {course.title}'
        message = f'Пользователь {user.first_name} {user.last_name} ({user.email}) зарегистрировался и оплатил участие в курсе {course.title}.'
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True
        )
    except:
        return None
