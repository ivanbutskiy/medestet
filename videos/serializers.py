from rest_framework import serializers
from .models import Video


class VideoPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'slug', 'title', 'image', 'adding_date']


class VideoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
