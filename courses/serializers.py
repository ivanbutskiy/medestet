from rest_framework import serializers
from .models import Course, Lesson, Module, Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    
    lesson = LessonSerializer(source='lesson_set', many=True)

    class Meta:
        model = Module
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):

    module = ModuleSerializer(source='module_set', many=True)
    person = PersonSerializer(source='person_set', many=True)

    class Meta:
        model = Course
        fields = '__all__'


class CoursePreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['slug', 'title', 'subtitle', 'short_description', 'starting_date', 'price', 'preview_image']