# Zieldatei: project_config/urls.py

from django.contrib import admin
from django.urls import path, include # Wichtig: 'include' muss hier stehen

urlpatterns = [
    path('admin/', admin.site.urls),
    # Diese Zeile leitet alle Anfragen an /api/ an unsere api-App weiter
    path('api/', include('api.urls')),
]
