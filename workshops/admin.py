from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import (
    Workshop, 
    Lesson, 
    Option,
    WorkshopPromocode,
    WorkshopOrder
    )


class WorkshopOrderAdminModel(admin.ModelAdmin):
    def check_payment(modeladmin, request, queryset):
        for order in queryset:
            order.status = 'paid'
            order.save()

            order.student.buy_count += 1
            order.student.buy_sum += order.order_sum
            order.student.save()
    check_payment.short_description = 'Підтвердити оплату'

    def cancell(modeladmin, request, queryset):
        for order in queryset:
            order.status = 'cancelled'
            order.save()
    cancell.short_description = 'Скасувати участь'

    fields = ['student', 'workshop', 'option', 'status',
        'order_sum', 'payment_date', 'promocode']
    list_display = ['id', 'student', 'workshop', 'status']
    list_editable = ['status']
    list_filter = ['workshop', 'status']
    readonly_fields = ['payment_date']
    sortable_by = ['payment_date']
    actions = [check_payment, cancell]


class WorkshopPromocodeAdminModel(admin.ModelAdmin):
    fields = ['code', 'discount', 'workshops', 'is_active']
    list_display = ['code', 'discount', 'is_active']
    list_editable = ['is_active']
    list_display_links = ['code']
    list_filter = ['workshops']


class LessonAdminModel(admin.ModelAdmin):
    fields = [
        'workshop',
        'title',
        'short_description',
        'starting_date',
        'is_active',
    ]
    list_display =  ['title', 'starting_date', 'is_active']
    list_editable = ['is_active']
    list_filter = ['workshop', 'is_active']
    sortable_by = ['starting_date']


class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 1


class OptionInline(admin.StackedInline):
    model = Option
    extra = 1


class OptionAdminModel(admin.ModelAdmin):
    fields = [
        'id',
        'workshop',
        'title',
        'description',
        'price',
    ]
    list_display =  ['id', 'title', 'price']
    list_filter = ['workshop']
    sortable_by = ['workshop']


class WorkshopAdminForm(forms.ModelForm):
    description = forms.CharField(label='Опис семінару', widget=CKEditorUploadingWidget())
    location = forms.CharField(label='Місце проведення', widget=CKEditorUploadingWidget())
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
        ('Попередній перегляд семінару', {
            'fields': ('title', 'subtitle', 'header_image', 'starting_date', 'adding_date')
        }),
        ('Опис семінару', {
            'fields': ('description', 'description_image')
        }),
        ('Локація', {
            'fields': ('location', 'location_image')
        }),
        ('Конфігурація', {
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
admin.site.register(WorkshopOrder, WorkshopOrderAdminModel)
admin.site.register(WorkshopPromocode, WorkshopPromocodeAdminModel)
