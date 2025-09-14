from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import get_user_model


User = get_user_model()


def alert_user(user, access):
    try:
        subject = '[Medestet] Повідомлення про сертифікацію'
        if access:
            message = (
                f'Доброго дня, {user.first_name}. Вітаємо, ваш обліковий запис сертифіковано! '
                f'Тепер ви можете користуватися всіма можливостями нашого сайту, '
                f'які недоступні звичайним користувачам.'
            )
        else:
            message = f'Доброго дня, {user.first_name}. На жаль, ваш сертифікат не пройшов перевірку.'
        send_mail(subject=subject,
            message=message, 
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False)
    except:
        pass

    
def alert_certify_admin(user):
    try:
        subject = 'Повідомлення про заявку на сертифікацію'
        message = f'Користувач {user.email} відправив свій сертифікат на розгляд. Будь ласка, розгляньте його заявку.'
        send_mail(subject=subject,
            message=message, 
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False)
    except:
        pass
