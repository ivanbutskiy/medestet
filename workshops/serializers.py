from rest_framework import serializers
from .models import Workshop, Lesson, Option


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'


class WorkshopSerializer(serializers.ModelSerializer):

    lesson = LessonSerializer(source='lesson_set', many=True)
    option = OptionSerializer(source='option_set', many=True)

    class Meta:
        model = Workshop
        fields = '__all__'
