from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include
from story.views import StoryView, SectionView, OptionView

router = DefaultRouter()
router.register('stories',StoryView )
router.register('sections', SectionView)
router.register('options', OptionView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
