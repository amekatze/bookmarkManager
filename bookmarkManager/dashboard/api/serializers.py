from rest_framework import serializers
from dashboard.models import Bookmark, Category


class BookmarkSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(read_only=True)

    class Meta:
        model = Bookmark
        fields = ['id', 'category', 'category_name', 'name',
                  'url', 'description', 'notes', 'updated', 'created']


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'
