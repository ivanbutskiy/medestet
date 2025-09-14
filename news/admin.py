from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from .models import News


class NewsAdminForm(forms.ModelForm):
    text = forms.CharField(label='Текст новини', widget=CKEditorUploadingWidget())
    class Meta:
        model = News
        fields = '__all__'


class NewsAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }
    form = NewsAdminForm
    readonly_fields = ('adding_date', 'update_date')
    list_display = ['id' ,'title', 'adding_date', 'update_date', 'is_published']
    list_editable = ['is_published']
    list_display_links = ['id', 'title']
    search_fields = ['title', 'subtitle', 'text']
    fieldsets = (
        ('Назва', {
            'fields': ('slug', 'title', 'subtitle')
        }),
        ('Зображення', {
            'fields': ('image',)
        }),
        ('Контент', {
            'fields': ('text',)
        }),
        ('Дати публікації', {
            'fields': ('adding_date', 'update_date')
        }),
        ('Опубліковано', {
            'fields': ('is_published',)
        }),
    )


admin.site.register(News, NewsAdminModel)
