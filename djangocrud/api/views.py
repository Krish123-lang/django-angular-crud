from django.shortcuts import render

# Create your views here.
from .models import Movie
from rest_framework import viewsets
from .serializers import MovieSerializer
from rest_framework.response import Response


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-year')
    serializer_class = MovieSerializer

    def list(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
