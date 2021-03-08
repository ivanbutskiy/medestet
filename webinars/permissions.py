from rest_framework.permissions import BasePermission
from .models import Webinar, WebinarOrder


class IsWebinarOwner(BasePermission):


    def has_permission(self, request, view):
        try:
            slug_webinar = view.kwargs['slug']
            user_id = int(request.user.id)
            webinar = Webinar.objects.get(slug=slug_webinar)

            assert webinar.webinarorder_set.filter(student=user_id)
            return True
        except:
            return False
