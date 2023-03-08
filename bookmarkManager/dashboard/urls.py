from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('bookmark/<str:pk>/', views.bookmark, name="bookmark"),
    path('create-bookmark/', views.createBookmark, name="create-bookmark"),
]
