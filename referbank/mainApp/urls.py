from django.urls import path
from . import views
from mainApp.models import Banks
from django.views.generic import ListView, DetailView

urlpatterns = [
    path('', views.index, name='index'),
    path('addbank', views.addbank, name='addbank'),
    path('updbank', views.updbank, name='updbank'),
    path('deletebank', views.deletebank, name='deletebank'),
]