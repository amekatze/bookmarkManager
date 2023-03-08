from rest_framework.decorators import api_view
from rest_framework.response import Response
from dashboard.models import Bookmark
from .serializers import BookmarkSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/bookmarks',
        'GET /api/bookmark/:id'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def getBookmarks(request):

    if request.method == 'GET':
        bookmarks = Bookmark.objects.all()
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookmarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET', 'PATCH', 'DELETE'])
def getBookmark(request, pk):
    try:
        bookmark = Bookmark.objects.get(id=pk)
    except Bookmark.DoesNotExist:
        return Response({"error": "Bookmark not found"})

    if request.method == 'GET':
        serializer = BookmarkSerializer(bookmark, many=False)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = BookmarkSerializer(
            bookmark, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    elif request.method == 'DELETE':
        bookmark.delete()
        return Response({"message": "Bookmark deleted successfully"})
