from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status as st
from .models import Course, Person, Module, Lesson
from .serializers import CourseSerializer, CoursePreviewSerializer, LessonSerializer
from decimal import Decimal
from datetime import datetime
import hmac
from .service import send_register_mail, send_admin_email
from .permissions import IsCourseOwner


User = get_user_model()


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

                course.students.add(user)
                course.save()
            
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
        except:
            return Response({}, st.HTTP_404_NOT_FOUND)


class UserCourses(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CoursePreviewSerializer

    def get_queryset(self):
        courses = Course.objects.filter(students__exact=int(self.request.user.id))
        return courses


class UserCourseDetail(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsCourseOwner]
    serializer_class = CourseSerializer
    lookup_field = 'slug'
    queryset = Course.objects.all()


class LessonDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsCourseOwner]
    serializer_class = LessonSerializer
    lookup_field = 'id'
    queryset = Lesson.objects.all()