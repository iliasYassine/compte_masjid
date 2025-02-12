from django import views
from django.urls import path
from .views import CompteAPIVIEW

urlpatterns = [ path('compte/', CompteAPIVIEW.as_view(), name='compte'),]