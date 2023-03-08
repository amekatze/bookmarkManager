from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('bookmarks/', views.getBookmarks),
    path('bookmarks/<str:pk>', views.getBookmark)
]
