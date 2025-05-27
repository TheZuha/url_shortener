from django.urls import path
from .views import URLShortenerView, GetURL, UpdateURL, DeleteURL, URLStats
from django.views.generic import TemplateView

urlpatterns = [
    path('shorten', URLShortenerView.as_view(), name='shorten'),
    path('shorten/<str:short_code>', GetURL.as_view()),
    path('shorten/<str:short_code>/update', UpdateURL.as_view()),
    path('shorten/<str:short_code>/delete', DeleteURL.as_view()),
    path('shorten/<str:short_code>/stats', URLStats.as_view()),
    path('', TemplateView.as_view(template_name="index.html"), name='frontend'),
]
