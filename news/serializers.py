from rest_framework import serializers
from .models import News


class NewsPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'slug', 'title', 'image', 'adding_date']


class NewsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'
