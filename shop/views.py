from django.contrib.auth import get_user_model
from django.conf import settings
from decimal import Decimal
from rest_framework.response import Response
from rest_framework import status as st
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.views import APIView
from .paginators import ProductPaginator
from rest_framework.permissions import AllowAny
from datetime import datetime
import hmac
from .service import send_order_mail, send_order_admin
from .models import (
    Product, 
    Category, 
    Currency, 
    Brand, 
    PromoCode, 
    Payment,
    Delivery,
    Order,
    OrderItem
)
from .serializers import (
    ProductPreviewSerializer, 
    ProductSerializer, 
    CategorySerializer,
    PromoCodeSerializer,
    PaymentSerializer,
    DeliverySerializer,
    OrderSerializer
)


User = get_user_model()


class CheckServiceURL(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            order_reference = request.data['orderReference']
            order = Order.objects.get(order_reference=order_reference)
            client_email = request.data['email']

            merchant = Payment.objects.filter(payment_type='WFP', is_published=True)[0]

            if request.data['transactionStatus'] == 'Approved' or request.data['reason'] == 'ok':
                order.status = 'paid'
                order.save()
                try:
                    user = User.objects.get(email=client_email)
                    user.buy_count += 1
                    user.buy_sum += Decimal(str(request.data['amount']))
                    user.save()
                except:
                    None

                status = 'accept'
                time = str(int(datetime.utcnow().timestamp()))
                msg = bytes(';'.join([order_reference, status, time]), encoding='utf-8')
                merchant_secret_key = bytes(merchant.MERCHANT_SECRET_KEY, encoding='utf-8')
                merchant_signature = hmac.new(key=merchant_secret_key, msg=msg, digestmod='MD5').hexdigest() 
                return Response(
                    {
                    'orderReference': order_reference,
                    'status': status,
                    'time': time,
                    'signature': merchant_signature
                    }
                )
            else:
                return Response({}, st.HTTP_404_NOT_FOUND)
        except:
            return Response({}, st.HTTP_404_NOT_FOUND)


class OrderRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        try:
            new_order = Order()
            new_order.order_reference = data['order_reference']
            new_order.status = 'wait_paid'
            new_order.order_sum = Decimal(str(data['order_sum']))
            new_order.last_name = data['last_name']
            new_order.first_name = data['first_name']
            new_order.phone = data['phone']
            new_order.email = data['email']
            new_order.region = data['region']
            new_order.district = data['district']
            new_order.city = data['city']
            new_order.delivery = Delivery.objects.get(pk=int(data['delivery_id']))
            new_order.delivery_office = data['delivery_office']
            new_order.merchant_order_date = data['merchant_order_date']
            new_order.is_done = False
            if data['promocode']:
                try:
                    promocode = PromoCode.objects.get(code=str(data['promocode']))
                    new_order.promocode = promocode
                except:
                    None

            if request.user.is_authenticated:
                user = User.objects.get(email=str(request.user))
                new_order.consumer = user
            else:
                try:
                    user = User.objects.get(email=data['email'])
                    new_order.consumer = user
                except:
                    None

            new_order.save()

            products = data['products']

            for product in products:
                order_item = OrderItem()
                order_item.order = new_order
                order_item.product = Product.objects.get(slug=product['slug'])
                order_item.price = product['price']
                order_item.count = product['count']
                order_item.save()

            send_order_mail(new_order.id)
            send_order_admin(new_order.id)

            return Response({
                "id": new_order.id,
                "order_reference": new_order.order_reference}, status=st.HTTP_200_OK)
        except:
            return Response({}, status=st.HTTP_404_NOT_FOUND)
        

class DeliveryListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = DeliverySerializer
    queryset = Delivery.objects.filter(is_published=True)


class PaymentListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PaymentSerializer
    queryset = Payment.objects.filter(is_published=True)


class PromoCodeDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = PromoCodeSerializer
    queryset = PromoCode.objects.all()
    lookup_field = 'code'


class ProductsList(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPaginator

    def get_queryset(self):
        products = Product.objects.filter(is_published=True)
        return products


class ProductDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_published=True)
    lookup_field = 'slug'


class CategoriesListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_published=True)


class ProductsListByCategory(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPaginator

    def get_queryset(self):
        category_id = Category.objects.get(slug=self.kwargs['category_slug'])
        products = Product.objects.filter(category_id=category_id, is_published=True)
        return products
