from django.contrib import admin
from .models import UserAccount


class UserAccountAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Личные данные', {
            'fields': ('email','last_name', 'first_name', 'patronym')
        }),
        ('Фото и контакты', {
            'fields': ('photo','phone')
        }),
        ('Потребительская статистика', {
            'fields': ('buy_count','buy_sum')
        }),
        ('Сертификация', {
            'fields': ('certificate','is_certified')
        }),
        ('Права доступа', {
            'fields': ('is_active','is_staff', 'is_superuser')
        })
        )
    readonly_fields = ['register_date']
    list_filter = ['is_certified', 'is_active', 'is_staff']
    list_display = ['id', 'email', 'first_name', 'last_name', 'is_certified', 'is_active']
    list_display_links = ['id', 'email']
    list_editable = ['is_certified', 'is_active']
    search_fields = ['email', 'last_name']
    ordering = ['is_superuser', 'register_date']


admin.site.register(UserAccount, UserAccountAdmin)
