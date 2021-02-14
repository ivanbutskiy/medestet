from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import Webinar, Theme, Option


class ThemeAdminModel(admin.ModelAdmin):
    fields = [
        'webinar',
        'title',
        'short_description',
        'is_published',
    ]
    list_display =  ['title', 'is_published']
    list_editable = ['is_published']
    list_filter = ['webinar', 'is_published']
    sortable_by = ['-pk']


class ThemeInline(admin.StackedInline):
    model = Theme
    extra = 1


class OptionInline(admin.StackedInline):
    model = Option
    extra = 1


class OptionAdminModel(admin.ModelAdmin):
    fields = [
        'webinar',
        'title',
        'description',
        'is_paid',
        'price',
    ]
    list_display =  ['title', 'webinar', 'price', 'is_paid']
    list_editable = ['is_paid']
    list_filter = ['webinar']
    sortable_by = ['-pk']


class WebinarAdminForm(forms.ModelForm):
    description = forms.CharField(label='Описание вебинара', widget=CKEditorUploadingWidget())
    class Meta:
        model = Webinar
        fields = '__all__'


class WebinarAdminModel(admin.ModelAdmin):
    form = WebinarAdminForm
    inlines = [ThemeInline, OptionInline]
    fieldsets = (
        (None, {
            'fields': ('slug',)
        }),
        ('Превью вебинара', {
            'fields': ('title', 'subtitle', 'header_image', 'starting_date')
        }),
        ('Описание вебинара', {
            'fields': ('description', 'description_image', 'video', 'video_record')
        }),
        ('Участники', {
            'fields': ('students',)
        }),
        ('Конфигурация', {
            'fields': ('is_published', 'is_started')
        })
    )
    list_filter = ['starting_date', 'is_published', 'is_started']
    sortable_by = ['-pk']
    list_display = ['title', 'starting_date', 'is_published', 'is_started']
    list_editable = ['is_published', 'is_started']
    prepopulated_fields = {'slug': ('title',), }


admin.site.register(Webinar, WebinarAdminModel)
admin.site.register(Theme, ThemeAdminModel)
admin.site.register(Option, OptionAdminModel)
