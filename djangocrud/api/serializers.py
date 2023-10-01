from rest_framework import routers, serializers, viewsets

from .models import Movie

# Serializers define the API representation.


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'year']

class MovieMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title']
