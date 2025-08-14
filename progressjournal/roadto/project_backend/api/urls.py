from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet

# Ein Router wird verwendet, um automatisch die URLs für ein ViewSet zu generieren.
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    # Alle vom Router generierten URLs werden hier eingebunden.
    # Das ergibt z.B. die Route /api/projects/
    path('', include(router.urls)),
]

