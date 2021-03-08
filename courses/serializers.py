from rest_framework import serializers
from .models import (
    Course, 
    Lesson, 
    Module, 
    Person, 
    CourseOrder,
    CoursePromocode
    )

from datetime import timedelta


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Lesson


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


class CourseOrderSerializer(serializers.ModelSerializer):

    ending_date = serializers.DateTimeField()
    days_left = serializers.IntegerField()

    class Meta:
        model = CourseOrder
        fields = '__all__'


class CoursePreviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['id', 'slug', 'title', 'subtitle', 'short_description', 'header_image', 
            'starting_date', 'price', 'preview_image']


class PromocodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePromocode
        fields = '__all__'
