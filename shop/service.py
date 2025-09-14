from django.conf import settings
from django.core.mail import send_mail
from shop.models import Order, Payment
from django.template.loader import get_template


def send_order_mail(order_id):
    try:
        order = Order.objects.get(id=order_id)
        products = order.orderitem_set.all()
        user_name = order.first_name
        user_email = order.email
        order_sum = order.order_sum
        order_reference = order.order_reference

        context = {
            'products': products,
            'user_name': user_name,
            'order_sum': order_sum,
            'order_reference': order_reference
        }

        send_mail(subject='Ваше замовлення успішно оформлено!',
            message='Дякуємо за оформлення замовлення',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user_email],
            fail_silently=True,
            html_message=get_template('shop/check_shop_order.html').render(context))
    except:
        return None


def send_order_admin(order_id):
    try:
        order = Order.objects.get(id=order_id)
        order_reference = order.order_reference
        subject = 'Отримано нове замовлення'
        message = f'Загляньте в адміністративну панель, там зареєстровано нове замовлення з унікальним ідентифікатором {order.order_reference}.'
        send_mail(subject=subject,
            message=message, 
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False)
    except:
        return None
