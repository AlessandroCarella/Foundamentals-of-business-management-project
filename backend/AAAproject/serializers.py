from rest_framework import serializers
from .models import AAAproject

class AAAprojectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AAAproject
        fields = ('id', 'title', 'description', 'completed')