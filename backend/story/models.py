from django.contrib.auth.models import User
from django.db import models
# Create your models here.
class StoryModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    author = models.CharField(max_length=150)
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f'story id {self.id}'
    
class SectionModel(models.Model):
    story = models.ForeignKey(StoryModel, on_delete=models.CASCADE, related_name='sections')
    content = models.TextField() 
    is_end = models.BooleanField(default=False) 

    def __str__(self):
        return f'section no {self.id} of story {self.story.id}'
   
class OptionModel(models.Model):
    section = models.ForeignKey(SectionModel, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=255)  
    next_section = models.ForeignKey(SectionModel, on_delete=models.CASCADE, related_name='previous_options')

    def __str__(self):
        return f'option no {self.id} of the section {self.section.id}'

