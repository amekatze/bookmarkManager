from django.forms import ModelForm
from .models import Bookmark, Category


class BookmarkForm(ModelForm):
    class Meta:
        model = Bookmark
        fields = '__all__'
