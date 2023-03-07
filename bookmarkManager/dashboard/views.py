from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, 'home.html')


def bookmark(request):
    return render(request, 'bookmark.html')
