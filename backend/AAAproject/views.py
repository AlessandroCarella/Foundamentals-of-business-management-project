from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AAAprojectSerializer
from .models import AAAproject

# Create your views here.

class AAAprojectView(viewsets.ModelViewSet):
    serializer_class = AAAprojectSerializer
    queryset = AAAproject.objects.all()