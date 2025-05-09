from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import URL
from .serializers import URLSerializer

# Create your views here.

class URLShortenerView(APIView):
    def post(self, request):
        serializer = URLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetURL(APIView):
    def get(self, request, short_code):
        try:
            url = URL.objects.get(short_code=short_code)
            url.count += 1
            url.save()
            return Response(URLSerializer(url).data)
        except URL.DoesNotExist:
            return Response({'error': 'URL not found'}, status=status.HTTP_404_NOT_FOUND)
   
        
class UpdateURL(APIView):
    def put(self, request, short_code):
        try:
            url = URL.objects.get(short_code=short_code)
        except URL.DoesNotExist:
            return Response({'error': 'URL not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = URLSerializer(url, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class DeleteURL(APIView):
    def delete(self, request, short_code):
        try:
            url = URL.objects.get(short_code=short_code)
            url.delete()
            return Response({'message': 'URL deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except URL.DoesNotExist:
            return Response({'error': 'URL not found'}, status=status.HTTP_404_NOT_FOUND)
        
class URLStats(APIView):
    def get(self, request, short_code):
        try:
            url = URL.objects.get(short_code=short_code)
            return Response({'count': url.count})
        except URL.DoesNotExist:
            return Response({'error': 'URL not found'}, status=status.HTTP_404_NOT_FOUND)