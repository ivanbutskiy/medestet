from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import Workshop, Lesson, Option


class LessonAdminModel(admin.ModelAdmin):
    fields = [
        'workshop',
        'title',
        'short_description',
        'starting_date',
        'is_published',
        'is_active',
    ]
    list_display =  ['title', 'starting_date', 'is_published', 'is_active']
    list_editable = ['is_published', 'is_active']
    list_filter = ['workshop', 'is_published', 'is_active']
    sortable_by = ['starting_date']


class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 1


class OptionInline(admin.StackedInline):
    model = Option
    extra = 1


class OptionAdminModel(admin.ModelAdmin):
    fields = [
        'workshop',
        'title',
        'description',
        'price',
    ]
    list_display =  ['title', 'price']
    list_filter = ['workshop']
    sortable_by = ['workshop']


class WorkshopAdminForm(forms.ModelForm):
    description = forms.CharField(label='Описание семинара', widget=CKEditorUploadingWidget())
    class Meta:
        model = Workshop
        fields = '__all__'


class WorkshopAdminModel(admin.ModelAdmin):
    form = WorkshopAdminForm
    inlines = [LessonInline, OptionInline]
    fieldsets = (
        (None, {
            'fields': ('slug',)
        }),
        ('Превью семинара', {
            'fields': ('title', 'subtitle', 'header_image', 'starting_date')
        }),
        ('Описание семинара', {
            'fields': ('description', 'description_image')
        }),
        ('Локация', {
            'fields': ('location', 'location_image')
        }),
        ('Участники', {
            'fields': ('students',)
        }),
        ('Конфигурация', {
            'fields': ('is_published', 'is_started')
        })
    )
    readonly_fields = ['adding_date']
    list_filter = ['adding_date', 'starting_date', 'is_published', 'is_started']
    sortable_by = ['-adding_date']
    list_display = ['title', 'starting_date', 'is_published', 'is_started']
    list_editable = ['is_published', 'is_started']
    prepopulated_fields = {'slug': ('title',), }


admin.site.register(Workshop, WorkshopAdminModel)
admin.site.register(Lesson, LessonAdminModel)
admin.site.register(Option, OptionAdminModel)