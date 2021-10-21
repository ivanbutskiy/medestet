from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from decimal import Decimal
from datetime import datetime
import hmac
from django.conf import settings
from .permissions import IsWebinarOwner
from .service import send_register_mail, send_admin_email
from .serializers import (
    WebinarSerializer,
    WebinarPromocodeSerializer,
    WebinarOrderSerializer,
    WebinarPreviewSerializer
    )
from .models import (
    Webinar, 
    Theme, 
    Option,
    WebinarPromocode,
    WebinarOrder
    )


User = get_user_model()


class LastWebinarsView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarPreviewSerializer
    queryset = Webinar.objects.filter(is_published=True)[:5]


class WebinarsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarSerializer
    queryset = Webinar.objects.filter(is_published=True)


class WebinarDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarSerializer
    queryset = Webinar.objects.all()
    lookup_field = 'slug'


class CheckServiceURL(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            order_reference = request.data['orderReference']
            order = WebinarOrder.objects.get(order_reference=order_reference)
            user = order.student

            if request.data['transactionStatus'] == 'Approved' or request.data['reason'].lower() == 'ok':
                if order.order_sum:
                    user.buy_count += 1
                    user.buy_sum += order.order_sum
                    user.save()

                order.status = 'paid'
                order.save()
            
                st = 'accept'
                time = str(int(datetime.utcnow().timestamp()))
                msg = bytes(';'.join([order_reference, st, time]), encoding='utf-8')
                merchant_secret_key = bytes(settings.MERCHANT_SECRET_KEY, encoding='utf-8')
                merchant_signature = hmac.new(key=merchant_secret_key, msg=msg, digestmod='MD5').hexdigest()
            
            return Response(
                {
                    'orderReference': order_reference,
                    'status': st,
                    'time': time,
                    'signature': merchant_signature
                }
            )
        except:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


class UserWebinarsOrderList(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WebinarOrderSerializer

    def get_queryset(self):
        webinar_orders = WebinarOrder.objects.filter(student=self.request.user.id).exclude(status='cancelled')
        return webinar_orders


class UserWebinarDetail(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsWebinarOwner]
    serializer_class = WebinarSerializer
    lookup_field = 'slug'
    queryset = Webinar.objects.all()


class CheckPromocode(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarPromocodeSerializer
    lookup_field = 'code'
    queryset = WebinarPromocode.objects.all()


class CheckOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_id = request.user.id
            user = User.objects.get(pk=user_id)

            order_reference = request.data['orderReference']

            webinar_id = request.data['webinarId']
            webinar = Webinar.objects.get(pk=webinar_id)

            option_id = request.data['optionId']
            option = Option.objects.get(pk=option_id)

            get_promocode = request.data['promocode']

            order = WebinarOrder()
            order.student = user
            order.order_reference = order_reference
            order.webinar = webinar
            order.option = option
            order.status = 'apply'
            
            if option.price:
                if get_promocode:
                    promocode = WebinarPromocode.objects.get(code=get_promocode)
                    order.promocode = promocode
                    order.order_sum = option.price - Decimal(((float(option.price) / 100) * promocode.discount)).quantize(Decimal('1.00'))
                else:
                    order.order_sum = option.price
            else:
                order.order_sum = 0
            order.save()
            send_register_mail(user, webinar)
            send_admin_email(user, webinar)
            serializer = WebinarOrderSerializer(order)
            return Response(serializer.data)
        except:
            return Response({}, status.HTTP_404_NOT_FOUND)