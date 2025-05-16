from django.urls import path
from .views import URLShortenerView, GetURL, UpdateURL, DeleteURL, URLStats

urlpatterns = [
    path('shorten', URLShortenerView.as_view(), name='shorten'),
    path('shorten/<str:short_code>', GetURL.as_view()),
    path('shorten/<str:short_code>/update', UpdateURL.as_view()),
    path('shorten/<str:short_code>/delete', DeleteURL.as_view()),
    path('shorten/<str:short_code>/stats', URLStats.as_view()),
]
