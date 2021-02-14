from rest_framework.permissions import BasePermission
from .models import Webinar


class IsWebinarOwner(BasePermission):


    def has_permission(self, request, view):
        slug_webinar = view.kwargs['slug']
        user_id = int(request.user.id)

        webinar = Webinar.objects.get(slug=slug_webinar)
        try:
            assert webinar.students.get(pk=user_id)
            return True
        except:
            return False
