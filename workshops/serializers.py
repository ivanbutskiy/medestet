from rest_framework import serializers
from .models import Workshop, Lesson, Option, WorkshopPromocode, WorkshopOrder


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


class WorkshopPromocodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopPromocode
        fields = '__all__'


class WorkshopPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = ['id', 'title', 'starting_date', 'slug', 'subtitle', 'header_image']


class WorkshopOrderSerializer(serializers.ModelSerializer):
    workshop = WorkshopPreviewSerializer()
    class Meta:
        model = WorkshopOrder
        fields = '__all__'
