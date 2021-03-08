from rest_framework import serializers
from .models import Post


class PostPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'slug', 'title', 'image', 'adding_date']


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
