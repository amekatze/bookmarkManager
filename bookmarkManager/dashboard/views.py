from django.shortcuts import render, redirect
from django.db.models import Q
from .models import Bookmark, Category
from .forms import BookmarkForm


# Create your views here.


def home(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''
    bookmarks = Bookmark.objects.filter(
        Q(category__name__icontains=q) |
        Q(name__icontains=q) |
        Q(description__icontains=q)
    )

    categories = Category.objects.all()
    bookmark_count = bookmarks.count()

    context = {'bookmarks': bookmarks, 'categories': categories,
               'bookmark_count': bookmark_count}
    return render(request, 'dashboard/home.html', context)


def bookmark(request, pk):
    bookmark = Bookmark.objects.get(id=pk)
    context = {'bookmark': bookmark}
    return render(request, 'dashboard/bookmark.html', context)


def createBookmark(request):
    form = BookmarkForm()
    if request.method == 'POST':
        form = BookmarkForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')

    context = {'form': form}
    return render(request, 'dashboard/bookmark_form.html', context)


def updateBookmark(request, pk):
    bookmark = Bookmark.objects.get(id=pk)
    form = BookmarkForm(instance=bookmark)

    if request.method == 'POST':
        form = BookmarkForm(request.POST, instance=bookmark)
        if form.is_valid():
            form.save()
            return redirect('home')

    context = {'form': form}
    return render(request, 'dashboard/bookmark_form.html', context)


def deleteBookmark(request, pk):
    bookmark = Bookmark.objects.get(id=pk)
    if request.method == 'POST':
        bookmark.delete()
        return redirect('home')

    return render(request, 'dashboard/delete.html', {'obj': bookmark})
