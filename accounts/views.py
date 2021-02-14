from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserDetailSerializer, UserSerializer
from .service import alert_certify_admin


User = get_user_model()


class UserDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer

    def get_object(self):
        user_id = self.request.user.id
        user = get_object_or_404(User, id=user_id)
        return user


class UserUpdateView(UpdateAPIView):
    lookup_field = 'id'
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def patch(self, request, *args, **kwargs):
        user = User.objects.get(email=request.user)
        if request.data.get('certificate'):
            alert_certify_admin(user)

        return super(UserUpdateView, self).patch(request, *args, **kwargs)
