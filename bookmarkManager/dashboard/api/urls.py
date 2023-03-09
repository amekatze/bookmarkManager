from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('bookmark/', views.getBookmarks),
    path('bookmark/<str:pk>', views.getBookmark),
    path('category/', views.getCategories),
    path('category/<str:pk>', views.getCategories)
]
