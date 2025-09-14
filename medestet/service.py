from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.conf import settings


class MerchantView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            merchant_login = settings.MERCHANT_LOGIN
            merchant_secret_key = settings.MERCHANT_SECRET_KEY

            return Response({
                'merchantLogin': merchant_login,
                'merchantSecretKey': merchant_secret_key
            }, status=status.HTTP_200_OK)
        except:
            return Response({}, status.HTTP_404_NOT_FOUND)
