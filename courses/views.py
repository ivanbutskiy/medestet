from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status as st
from .models import Course, Person, Module, Lesson, CourseOrder, CoursePromocode
from decimal import Decimal
from datetime import datetime
import hmac
from .service import send_register_mail, send_admin_email
from .permissions import IsCourseOwner
from .serializers import (
    CourseSerializer, 
    CoursePreviewSerializer, 
    LessonSerializer,
    CourseOrderSerializer,
    PromocodeSerializer
    )


User = get_user_model()


class LastCoursesView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CoursePreviewSerializer
    queryset = Course.objects.filter(is_published=True)[:5]


class CoursesListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CoursePreviewSerializer
    queryset = Course.objects.filter(is_published=True)


class CourseDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = 'slug'


class CheckServiceURL(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            order_reference = request.data['orderReference']
            order_data = request.data['orderReference'].split('crs')
            course = Course.objects.get(pk=int(order_data[1]))
            user = User.objects.get(pk=int(order_data[0]))

            if request.data['transactionStatus'] == 'Approved' or request.data['reason'].lower() == 'ok':
                user.buy_count += 1
                user.buy_sum += Decimal(str(request.data['amount']))
                user.save()

                course_order = CourseOrder()

                course_order.student = user
                course_order.course = course
                course_order.order_sum = request.data['amount']
                course_order.order_reference = order_reference
                course_order.status = 'paid'
                course_order.save()
            
                status = 'accept'
                time = str(int(datetime.utcnow().timestamp()))
                msg = bytes(';'.join([order_reference, status, time]), encoding='utf-8')
                merchant_secret_key = bytes(settings.MERCHANT_SECRET_KEY, encoding='utf-8')
                merchant_signature = hmac.new(key=merchant_secret_key, msg=msg, digestmod='MD5').hexdigest()

                send_register_mail(user, course)
                send_admin_email(user, course)
            
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


class UserCourses(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CoursePreviewSerializer

    def get_queryset(self):
        courses = Course.objects.filter(courseorder__student=self.request.user.id, courseorder__status='paid')
        return courses


class UserCourseDetail(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsCourseOwner]
    serializer_class = CourseSerializer
    lookup_field = 'slug'
    queryset = Course.objects.all()


class LessonDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LessonSerializer
    lookup_field = 'id'
    queryset = Lesson.objects.all()


class CourseOrderView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsCourseOwner]
    serializer_class = CourseOrderSerializer
    lookup_field = 'slug'
    queryset = CourseOrder.objects.all()

    def get_object(self):
        course_id = Course.objects.get(slug=self.kwargs['slug']).id
        user_id = self.request.user.id
        order = CourseOrder.objects.get(student=user_id, course=course_id)
        return order


class CheckPromocode(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = PromocodeSerializer
    lookup_field = 'code'
    queryset = CoursePromocode.objects.all()
