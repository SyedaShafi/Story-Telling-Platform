from rest_framework import serializers
from .models import StoryModel, SectionModel, OptionModel


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryModel
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionModel
        fields = '__all__'

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionModel
        fields = '__all__'



