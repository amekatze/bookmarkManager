from rest_framework.serializers import ModelSerializer
from dashboard.models import Bookmark


class BookmarkSerializer(ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
