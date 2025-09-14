from django import forms
from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import (
    Course, 
    Module, 
    Lesson, 
    Person, 
    Subject,
    CoursePromocode,
    CourseOrder
)


class CoursePromocodeAdminModel(admin.ModelAdmin):
    list_display = ['code', 'discount', 'is_active']
    list_editable = ['is_active']
    list_filter = ['courses']


class CourseOrderAdminModel(admin.ModelAdmin):
    list_display = ['order_reference', 'student', 'course', 'status']
    list_editable = ['status']
    list_filter = ['course']
    sortable_by = ['payment_date']


class PersonInline(admin.StackedInline):
    model = Person
    extra = 1


class CourseAdminForm(forms.ModelForm):
    results = forms.CharField(label='Результати курсу', widget=CKEditorUploadingWidget())
    detail_description = forms.CharField(label='Детальний опис курсу', widget=CKEditorUploadingWidget())
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
    list_display = ['title', 'course', 'is_active']
    list_editable = ['is_active']
    inlines = [LessonInline]
    list_filter = ['course']


class LessonAdminModel(admin.ModelAdmin):
    list_display = ['title', 'is_active']
    list_editable = ['is_active']
    list_filter = ['module']


class CourseAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }
    form = CourseAdminForm
    readonly_fields = ('adding_date',)
    fieldsets = (
        (None, {
            'fields': ('slug', 'subject')
        }),
        ('Попередній перегляд курсу', {
            'fields': ('title', 'subtitle', 'short_description', 'header_image', 'preview_image', 'starting_date')
        }),
        ('Деталі курсу', {
            'fields': ('detail_description', 'detail_image', 'results')
        }),
        ('Конфігурація участі', {
            'fields': ('certificate', 'certificate_image', 'price', 'access_period', 'is_published')
        })
    )
    inlines = [ModuleInline, PersonInline]
    list_display = ['title', 'subject', 'price', 'is_published']
    list_editable = ['is_published']
    list_filter = ['subject']
    sortable_by = ['-adding_date']
    search_fields = ['title', 'subtitle', 'short_description', 'detail_description']


admin.site.register(Course, CourseAdminModel)
admin.site.register(Module, ModuleAdminModel)
admin.site.register(Lesson, LessonAdminModel)
admin.site.register(Person)
admin.site.register(Subject)
admin.site.register(CoursePromocode, CoursePromocodeAdminModel)
admin.site.register(CourseOrder, CourseOrderAdminModel)
