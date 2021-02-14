from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import get_user_model


User = get_user_model()


def alert_user(user, access):
    try:
        subject = '[Medestet] Уведомление о сертификации'
        message = f'Здравствуйте, {user.first_name}. Поздравляем, ваш аккаунт сертифицирован! Теперь вы можете пользоваться всеми возможностями нашего сайта, которые недоступны обычным пользователям.' if access else f'Здравствуйте, {user.first_name}. К сожалению, ваш сертификат не прошел проверку.'
        send_mail(subject=subject,
            message=message, 
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False)
        print('Was sended')
    except:
        None

    
def alert_certify_admin(user):
    try:
        subject = 'Уведомление о заявке на сертификацию'
        message = f'Пользователь {user.email} отправил свой сертификат на рассмотрение. Пожалуйста, рассмотрите его заявку.'
        send_mail(subject=subject,
            message=message, 
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False)
    except:
        None
