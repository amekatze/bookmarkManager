from django.shortcuts import render
from .models import Bookmark
from .forms import BookmarkForm


# Create your views here.


def home(request):
    bookmarks = Bookmark.objects.all()
    context = {'bookmarks': bookmarks}
    return render(request, 'dashboard/home.html', context)


def bookmark(request, pk):
    bookmark = Bookmark.objects.get(id=pk)
    context = {'bookmark': bookmark}
    return render(request, 'dashboard/bookmark.html', context)


def createBookmark(request):
    form = BookmarkForm()
    context = {'form': form}
    return render(request, 'dashboard/bookmark_form.html', context)
