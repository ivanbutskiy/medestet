from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import (
    Webinar, 
    Theme, 
    Option,
    WebinarOrder,
    WebinarPromocode
    )


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
        'option_type',
        'price',
    ]
    list_display =  ['title', 'webinar', 'price', 'option_type']
    list_editable = ['option_type']
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
        ('Конфигурация', {
            'fields': ('is_published', 'is_started')
        })
    )
    list_filter = ['starting_date', 'is_published', 'is_started']
    sortable_by = ['-pk']
    list_display = ['title', 'starting_date', 'is_published', 'is_started']
    list_editable = ['is_published', 'is_started']
    prepopulated_fields = {'slug': ('title',), }


class WebinarPromocodeAdminModel(admin.ModelAdmin):
    fields = ['code', 'discount', 'webinars', 'is_active']
    list_display = ['code', 'discount', 'is_active']
    list_editable = ['is_active']
    list_display_links = ['code']
    list_filter = ['webinars']


class WebinarOrderAdminModel(admin.ModelAdmin):
    def check_payment(modeladmin, request, queryset):
        for order in queryset:
            order.status = 'paid'
            order.save()

            order.student.buy_count += 1
            order.student.buy_sum += order.order_sum
            order.student.save()
    check_payment.short_description = 'Подтвердить оплату'

    fields = ['order_reference', 'student', 'webinar', 'option', 'status',
        'order_sum', 'payment_date', 'promocode']
    list_display = ['order_reference', 'student', 'webinar', 'status']
    list_editable = ['status']
    list_filter = ['webinar', 'status']
    readonly_fields = ['payment_date']
    sortable_by = ['payment_date']
    actions = [check_payment]


admin.site.register(WebinarOrder, WebinarOrderAdminModel)
admin.site.register(WebinarPromocode, WebinarPromocodeAdminModel)
admin.site.register(Webinar, WebinarAdminModel)
admin.site.register(Theme, ThemeAdminModel)
admin.site.register(Option, OptionAdminModel)
