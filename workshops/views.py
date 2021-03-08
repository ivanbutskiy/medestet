from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import status
from decimal import Decimal
from .service import send_register_mail, send_admin_email
from .serializers import (
    WorkshopSerializer, 
    WorkshopPromocodeSerializer, 
    WorkshopOrderSerializer,
    WorkshopPreviewSerializer
    )
from .models import (
    Workshop, 
    Lesson, 
    Option, 
    WorkshopOrder, 
    WorkshopPromocode
    )


User = get_user_model()


class LastWorkshopsView(ListAPIView):
    serializer_class = WorkshopPreviewSerializer
    permission_classes = [AllowAny]
    queryset = Workshop.objects.filter(is_published=True)[:5]


class WorkshopsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.filter(is_published=True)


class WorkshopDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()
    lookup_field = 'slug'


class CheckOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_id = request.user.id
            user = User.objects.get(pk=user_id)

            workshop_id = request.data['workshop_id']
            workshop = Workshop.objects.get(pk=workshop_id)

            option_id = request.data['option_id']
            option = Option.objects.get(pk=option_id)

            get_promocode = request.data['promocode']

            order = WorkshopOrder()
            order.student = user
            order.workshop = workshop
            order.option = option
            order.status = 'wait_paid'
            
            if option.price:
                if get_promocode:
                    promocode = WorkshopPromocode.objects.get(code=get_promocode)
                    order.promocode = promocode
                    order.order_sum = option.price - Decimal(((float(option.price) / 100) * promocode.discount)).quantize(Decimal('1.00'))
                else:
                    if user.discount_percent > 0:
                        order.order_sum = option.price - Decimal(((float(option.price) / 100) * user.discount_percent)).quantize(Decimal('1.00'))
                    else:
                        order.order_sum = option.price
            else:
                order.order_sum = option.price
            order.save()
            send_register_mail(user, workshop)
            send_admin_email(user, workshop)
            serializer = WorkshopOrderSerializer(order)
            return Response(serializer.data)
        except:
            return Response({}, status.HTTP_404_NOT_FOUND)


class CheckPromocode(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = WorkshopPromocodeSerializer
    lookup_field = 'code'
    queryset = WorkshopPromocode.objects.all()


class UserWorkshopOrderList(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkshopOrderSerializer

    def get_queryset(self):
        workshop_orders = WorkshopOrder.objects.filter(student=self.request.user.id).exclude(status='cancelled')
        return workshop_orders
