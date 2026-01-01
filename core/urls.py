from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('packages/', views.packages, name='packages'),
    path('platforms/', views.platforms, name='platforms'),
    path('case-studies/', views.case_studies, name='case_studies'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    
    # Legal pages
    path('transparency/', views.transparency, name='transparency'),
    path('data-handling/', views.data_handling, name='data_handling'),
    path('disclaimer/', views.disclaimer, name='disclaimer'),
    path('affiliations/', views.affiliations, name='affiliations'),
    path('privacy/', views.privacy, name='privacy'),
    path('terms/', views.terms, name='terms'),
    path('sitemap/', views.sitemap, name='sitemap'),
]