from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import URL
from .serializers import URLSerializer
from django.shortcuts import redirect
from drf_spectacular.utils import extend_schema, OpenApiResponse

# Create your views here.

class URLShortenerView(APIView):
    @extend_schema(
        request=URLSerializer,
        responses=URLSerializer,
        description="URL manzilni qisqartirish uchun endpoint. Faqat POST."
    )
    def post(self, request):
        serializer = URLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetURL(APIView):
    @extend_schema(
        responses={302: OpenApiResponse(description="Redirect to original URL"), 404: OpenApiResponse(description="URL not found")},
        description="Qisqa URL orqali original manzilga redirect qiladi. Brauzer uchun."
    )
    def get(self, request, short_code):
        try:
            url = URL.objects.get(short_code=short_code)
            url.count += 1
            url.save()
            return redirect(url.url)
        except URL.DoesNotExist:
            return Response({'error': 'URL not found'}, status=status.HTTP_404_NOT_FOUND)
   
        
class UpdateURL(APIView):
    @extend_schema(
        request=URLSerializer,
        responses=URLSerializer,
        description="Qisqa URL'ni yangilash."
    )
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
    @extend_schema(
        responses={204: OpenApiResponse(description="URL deleted successfully"), 404: OpenApiResponse(description="URL not found")},
        description="Qisqa URL'ni o'chirish."
    )
    def delete(self, request, short_code):
        try:
            url = URL.objects.get(short_code=short_code)
            url.delete()
            return Response({'message': 'URL deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except URL.DoesNotExist:
            return Response({'error': 'URL not found'}, status=status.HTTP_404_NOT_FOUND)
        
class URLStats(APIView):
    @extend_schema(
        responses={200: OpenApiResponse(description="Statistika: {'count': int}"), 404: OpenApiResponse(description="URL not found")},
        description="Qisqa URL uchun statistikani ko'rsatadi."
    )
    def get(self, request, short_code):
        try:
            url = URL.objects.get(short_code=short_code)
            return Response({'count': url.count})
        except URL.DoesNotExist:
            return Response({'error': 'URL not found'}, status=status.HTTP_404_NOT_FOUND)