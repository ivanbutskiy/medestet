from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import Brand, Currency, Category, Product


class BrandAdminModel(admin.ModelAdmin):
    fields = ['title', 'country', 'brand_image']
    list_display = ['title', 'country', 'brand_image']
    list_display_links = ['title']
    sortable_by = ['-pk']


class CurrencyAdminModel(admin.ModelAdmin):
    fields = ['title', 'exchange']
    readonly_fields = ['update_date']
    list_display = ['title', 'exchange', 'update_date']
    list_display_links = ['title']
    sortable_by = ['-pk']


class CategoryAdminModel(admin.ModelAdmin):
    fields = ['slug', 'title', 'subtitle', 'category_image', 'preview_category_image', 'is_published']
    list_display = ['title']
    list_display_links = ['title']
    sortable_by = ['-pk']
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
            'fields': ('description',)
        }),
        ('Стоимостные характеристики товара', {
            'fields': ('currency', 'price')
        }),
        ('Спецпредложения', {
            'fields': ('new_product', 'old_price')
        }),
        ('Картинки товара', {
            'fields': ('header_image', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6')
        }),
        ('Настройки публикации', {
            'fields': ('is_published',)
        }),


    )
    list_filter = ['price', 'new_product', 'title', 'category']
    sortable_by = ['-pk', 'price', 'new_product', 'title', 'category']
    list_display = ['title', 'category', 'brand', 'price', 'new_product', 'is_published']
    list_editable = ['new_product', 'is_published']
    prepopulated_fields = {'slug': ('title',), }


admin.site.register(Brand, BrandAdminModel)
admin.site.register(Currency, CurrencyAdminModel)
admin.site.register(Category, CategoryAdminModel)
admin.site.register(Product, ProductAdminModel)
