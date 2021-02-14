from rest_framework.permissions import BasePermission
from .models import Course


class IsCourseOwner(BasePermission):


    def has_permission(self, request, view):
        slug_course = view.kwargs['slug']
        user_id = int(request.user.id)

        course = Course.objects.get(slug=slug_course)
        try:
            assert course.students.get(pk=user_id)
            return True
        except:
            return False
