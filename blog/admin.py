from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from .models import Post


class PostAdminForm(forms.ModelForm):
    text = forms.CharField(label='Текст публикации', widget=CKEditorUploadingWidget())
    class Meta:
        model = Post
        fields = '__all__'


class PostAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }
    form = PostAdminForm
    readonly_fields = ('adding_date', 'update_date')
    list_display = ['id' ,'title', 'adding_date', 'update_date', 'is_published']
    list_editable = ['is_published']
    list_display_links = ['id', 'title']
    search_fields = ['title', 'subtitle', 'text']
    fieldsets = (
        ('Название', {
            'fields': ('slug', 'title', 'subtitle')
        }),
        ('Изображение', {
            'fields': ('image',)
        }),
        ('Контент', {
            'fields': ('text',)
        }),
        ('Даты публикации', {
            'fields': ('adding_date', 'update_date')
        }),
        ('Опубликовано', {
            'fields': ('is_published',)
        }),
    )


admin.site.register(Post, PostAdminModel)
