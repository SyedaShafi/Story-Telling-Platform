from django.contrib import admin
from .models import StoryModel, SectionModel, OptionModel
# Register your models here.
admin.site.register(SectionModel)
admin.site.register(StoryModel)
admin.site.register(OptionModel)