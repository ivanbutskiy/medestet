from rest_framework import serializers
from .models import (
    Webinar, 
    Option, 
    Theme, 
    WebinarPromocode,
    WebinarOrder
    )


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'


class WebinarSerializer(serializers.ModelSerializer):

    theme = ThemeSerializer(source='theme_set', many=True)
    option = OptionSerializer(source='option_set', many=True)

    class Meta:
        model = Webinar
        fields = '__all__'


class WebinarPromocodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebinarPromocode
        fields = '__all__'


class WebinarOrderSerializer(serializers.ModelSerializer):
    webinar = WebinarSerializer()
    class Meta:
        model = WebinarOrder
        fields = '__all__'


class WebinarPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webinar
        fields = ['id', 'slug', 'title', 'subtitle', 'header_image']
