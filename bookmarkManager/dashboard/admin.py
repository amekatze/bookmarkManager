from django.contrib import admin

# Register your models here.
from .models import Bookmark, Category

admin.site.register(Bookmark)
admin.site.register(Category)
