from django.shortcuts import render
from .models import StoryModel, SectionModel, OptionModel
from .serializers import StorySerializer, SectionSerializer, OptionSerializer 
from rest_framework.viewsets import ModelViewSet
# Create your views here.

class StoryView(ModelViewSet):
    queryset = StoryModel.objects.all()
    serializer_class = StorySerializer

class SectionView(ModelViewSet):
    queryset = SectionModel.objects.all()
    serializer_class = SectionSerializer

class OptionView(ModelViewSet):
    queryset = OptionModel.objects.all()
    serializer_class = OptionSerializer


