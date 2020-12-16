from django import forms
from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import Course, Module, Lesson, Person, Subject


class PersonInline(admin.StackedInline):
    model = Person
    extra = 1


class CourseAdminForm(forms.ModelForm):
    results = forms.CharField(label='Результаты курса', widget=CKEditorUploadingWidget())
    detail_description = forms.CharField(label='Детальное описание курса', widget=CKEditorUploadingWidget())
    class Meta:
        model = Course
        fields = '__all__'


class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 1


class ModuleInline(admin.StackedInline):
    model = Module
    extra = 1


class ModuleAdminModel(admin.ModelAdmin):
    list_display = ['title', 'course', 'is_published', 'is_active']
    list_editable = ['is_published', 'is_active']
    inlines = [LessonInline]
    list_filter = ['course']


class CourseAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }
    form = CourseAdminForm
    readonly_fields = ('adding_date',)
    fieldsets = (
        (None, {
            'fields': ('slug', 'subject')
        }),
        ('Превью курса', {
            'fields': ('title', 'subtitle', 'short_description', 'header_image', 'preview_image', 'starting_date')
        }),
        ('Детали курса', {
            'fields': ('detail_description', 'detail_image', 'results')
        }),
        ('Конфигурация участия', {
            'fields': ('certificate', 'certificate_image', 'price', 'is_published')
        }),
        (None, {
            'fields': ('students',)
        })
    )
    inlines = [ModuleInline, PersonInline]
    list_display = ['title', 'subject', 'price', 'is_published']
    list_editable = ['is_published']
    list_filter = ['subject']
    sortable_by = ['-adding_date']


admin.site.register(Course, CourseAdminModel)
admin.site.register(Module, ModuleAdminModel)
admin.site.register(Lesson)
admin.site.register(Person)
admin.site.register(Subject)

# TODO добавить последовательность модулей и уроков
