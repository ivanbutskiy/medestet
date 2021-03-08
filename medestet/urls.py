from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from .service import MerchantView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/workshops/', include('workshops.urls')),
    path('api/webinars/', include('webinars.urls')),
    path('api/shop/', include('shop.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/news/', include('news.urls')),
    path('api/videos/', include('videos.urls')),
    path('api/merchant/', MerchantView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
