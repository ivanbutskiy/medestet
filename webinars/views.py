from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Webinar, Theme, Option
from .serializers import WebinarSerializer
from django.contrib.auth import get_user_model
from decimal import Decimal
from datetime import datetime
import hmac
from django.conf import settings
from .permissions import IsWebinarOwner


User = get_user_model()


class WebinarsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarSerializer
    queryset = Webinar.objects.filter(is_published=True)


class WebinarDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = WebinarSerializer
    queryset = Webinar.objects.all()
    lookup_field = 'slug'


class CheckFreeServiceURL(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            user_id = request.user.id
            user = User.objects.get(pk=user_id)
            
            webinar_id = request.data['webinarId']
            webinar = Webinar.objects.get(pk=webinar_id)

            webinar.students.add(user)
            webinar.save()

            return Response({}, status=status.HTTP_200_OK)
        except:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


class CheckServiceURL(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            order_reference = request.data['orderReference']
            order_data = request.data['orderReference'].split('web')
            user = User.objects.get(pk=int(order_data[0]))
            webinar = Webinar.objects.get(pk=int(order_data[1]))

            if request.data['transactionStatus'] == 'Approved' or request.data['reason'].lower() == 'ok':
                user.buy_count += 1
                user.buy_sum += Decimal(str(request.data['amount']))
                user.save()

                webinar.students.add(user)
                webinar.save()
            
                st = 'accept'
                time = str(int(datetime.utcnow().timestamp()))
                msg = bytes(';'.join([order_reference, st, time]), encoding='utf-8')
                merchant_secret_key = bytes(settings.MERCHANT_SECRET_KEY, encoding='utf-8')
                merchant_signature = hmac.new(key=merchant_secret_key, msg=msg, digestmod='MD5').hexdigest()

                # send_register_mail(user, webinar)
                # send_admin_email(user, webinar)
            
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


class UserWebinars(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WebinarSerializer

    def get_queryset(self):
        webinars = Webinar.objects.filter(students__exact=int(self.request.user.id))
        return webinars


class UserWebinarDetail(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsWebinarOwner]
    serializer_class = WebinarSerializer
    lookup_field = 'slug'
    queryset = Webinar.objects.all()
