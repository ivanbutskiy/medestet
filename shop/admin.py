from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from decimal import Decimal
from .models import (
    Brand, 
    Currency, 
    Category, 
    Product,
    PromoCode,
    Delivery,
    Payment,
    OrderItem,
    Order
)


class OrderItemInlineModel(admin.TabularInline):
    model = OrderItem
    extra = 0


class OrderAdminModel(admin.ModelAdmin):

    def check_any_payment(modeladmin, request, queryset):
        for order in queryset:
            order.status = 'paid'
            order.save()
            if order.consumer:
                order.consumer.buy_count += 1
                order.consumer.buy_sum += Decimal(str(order.order_sum))
                order.consumer.save()
    check_any_payment.short_description = 'Подтвердить оплату'

    fieldsets = (
        ('id и статус заказа', {
            'fields': ('id', 'order_reference', 'order_sum', 'status', 'is_done', 'adding_date')
        }),
        ('Информация о покупателе', {
            'fields': (
                'consumer',
                'promocode',
                'email',
                'last_name',
                'first_name',
                'phone',
            )
        }),
        ('Доставка', {
            'fields': (
                'delivery', 
                'delivery_office',
                'region',
                'city'
            )
        }),
    )
    readonly_fields = ['order_reference', 'status', 'adding_date', 'id']
    list_display = ['id', 'order_reference', 'consumer', 'last_name', 'first_name', 'order_sum', 'status', 'adding_date', 'is_done']
    list_display_links = ['id', 'order_reference']
    list_editable = ['is_done']
    list_filter = ['status', 'is_done']
    ordering = ['-adding_date']
    search_fields = ['order_reference', 'consumer', 'last_name']
    inlines = [OrderItemInlineModel]
    actions = [check_any_payment]


class PaymentAdminForm(forms.ModelForm):
    short_description = forms.CharField(label='Описание платежного метода', widget=CKEditorUploadingWidget())
    class Meta:
        model = Payment
        fields = '__all__'


class PaymentAdminModel(admin.ModelAdmin):
    form = PaymentAdminForm
    list_display = ['title', 'payment_type', 'is_published']
    list_display_links = ['title']
    list_editable = ['is_published']
    list_filter = ['is_published']
    fieldsets = (
        ('Описание', {
            'fields': ('title', 'payment_type', 'logo', 'short_description')
        }),
        ('Секретные реквизиты', {
            'fields': ('MERCHANT_LOGIN', 'MERCHANT_SECRET_KEY')
        }),
        ('Опубликовано', {
            'fields': ('is_published',)
        }),
    )


class PromoCodeAdminModel(admin.ModelAdmin):
    fields = ['code', 'discount', 'products', 'is_active']
    list_display = ['code', 'discount', 'is_active']
    list_display_links = ['code']
    list_editable = ['is_active']
    ordering = ['-pk']
    search_fields = ['code']
    list_filter = ['is_active']


class DeliveryAdminModel(admin.ModelAdmin):
    fields = ['title', 'image', 'is_published']
    list_display = ['title', 'is_published']
    list_display_links = ['title']
    list_editable = ['is_published']
    ordering = ['-pk']
    list_filter = ['is_published']


class BrandAdminModel(admin.ModelAdmin):
    fields = ['title', 'country', 'brand_image']
    list_display = ['title', 'country', 'brand_image']
    list_display_links = ['title']
    ordering = ['-pk']


class CurrencyAdminModel(admin.ModelAdmin):
    fields = ['title', 'exchange']
    readonly_fields = ['update_date']
    list_display = ['title', 'exchange', 'update_date']
    list_display_links = ['title']
    sortable_by = ['-update_date']


class CategoryAdminModel(admin.ModelAdmin):
    fields = ['slug', 'title', 'preview_category_icon', 'is_published']
    list_display = ['title', 'is_published']
    list_editable = ['is_published']
    list_display_links = ['title']
    ordering = ['-pk']
    prepopulated_fields = {'slug': ('title',), }
    


class ProductAdminForm(forms.ModelForm):
    description = forms.CharField(label='Полное описание товара', widget=CKEditorUploadingWidget())
    class Meta:
        model = Product
        fields = '__all__'


class ProductAdminModel(admin.ModelAdmin):
    form = ProductAdminForm
    fieldsets = (
        ('Превью товара', {
            'fields': ('slug','title', 'short_description', 'brand', 'category')
        }),
        ('Описание товара', {
            'fields': ('description', 'volume')
        }),
        ('Стоимостные характеристики товара', {
            'fields': ('currency', 'price_certified', 'price_guest')
        }),
        ('Спецпредложения', {
            'fields': ('new_price_certified', 'new_price_guest')
        }),
        ('Картинки товара', {
            'fields': ('header_image', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6')
        }),
        ('Настройки публикации', {
            'fields': ('is_published',)
        }),
    )

    list_filter = ['category']
    ordering = ['-pk', 'price_certified', 'price_guest', 'title', 'category']
    list_display = ['title', 'category', 'brand', 'is_published']
    list_editable = ['is_published']
    prepopulated_fields = {'slug': ('title',), }


admin.site.register(Brand, BrandAdminModel)
admin.site.register(Currency, CurrencyAdminModel)
admin.site.register(Category, CategoryAdminModel)
admin.site.register(Product, ProductAdminModel)
admin.site.register(PromoCode, PromoCodeAdminModel)
admin.site.register(Delivery, DeliveryAdminModel)
admin.site.register(Payment, PaymentAdminModel)
admin.site.register(Order, OrderAdminModel)
