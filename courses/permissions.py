from rest_framework.permissions import BasePermission
from .models import Course, CourseOrder


class IsCourseOwner(BasePermission):

    def has_permission(self, request, view):
        slug_course = view.kwargs['slug']
        user_id = request.user.id

        course = Course.objects.get(slug=slug_course)
        try:
            if course.courseorder_set.filter(student=user_id):
                return True
            else:
                return False
        except:
            return False
