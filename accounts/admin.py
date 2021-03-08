from django.contrib import admin
from .models import UserAccount
from .service import alert_user


class UserAccountAdmin(admin.ModelAdmin):


    def confirm_certify(modeladmin, request, queryset):
        for user in queryset:
            user.is_certified = True
            user.save()
            alert_user(user, True)
    confirm_certify.short_description = 'Подтвердить сертификат'


    def reject_certify(modeladmin, request, queryset):
        for user in queryset:
            user.is_certified = False
            user.certificate.delete()
            user.save()
            alert_user(user, False)
    reject_certify.short_description = 'Отклонить сертификат'


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
    readonly_fields = ['register_date', 'is_certified']
    list_filter = ['is_certified', 'is_active', 'is_staff']
    list_display = ['id', 'email', 'first_name', 'last_name', 'buy_count', 'buy_sum', 'is_certified', 'is_active']
    list_display_links = ['id', 'email']
    list_editable = ['is_active']
    search_fields = ['email', 'last_name', 'id']
    ordering = ['is_superuser', 'register_date']
    actions = [confirm_certify, reject_certify]


admin.site.register(UserAccount, UserAccountAdmin)
