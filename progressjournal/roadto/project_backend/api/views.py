from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny # AllowAny nur für Entwicklung
from django.contrib.auth.models import User
# Wir importieren VORERST nur das, was wir wirklich für die Project-API brauchen:
from .models import Project
# Die Serializer importieren, die wir benötigen:
from .serializers import ProjectSerializer, UserSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API-Endpunkt, der das Anzeigen und Bearbeiten von Projekten ermöglicht.
    """
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny] # VORÜBERGEHEND für die Entwicklung

    def get_queryset(self):
        # Später: return Project.objects.filter(owner=self.request.user)
        return Project.objects.all() # Zeigt vorerst alle Projekte an

    def perform_create(self, serializer):
        # Später: serializer.save(owner=self.request.user)
        # Wir weisen es vorübergehend dem ersten Superuser zu.
        admin_user = User.objects.first()
        serializer.save(owner=admin_user)

# =============================================================================
# Der InboxItemViewSet wird vorübergehend auskommentiert, da er in den
# api/urls.py noch nicht registriert ist und den Start des Servers verhindert.
# Wir können ihn wieder aktivieren, sobald die Project-API funktioniert.
# =============================================================================
# class InboxItemViewSet(viewsets.ModelViewSet):
#     """
#     API-Endpunkt für Inbox-Einträge.
#     """
#     serializer_class = InboxItemSerializer
#     permission_classes = [AllowAny] # VORÜBERGEHEND für die Entwicklung
#
#     def get_queryset(self):
#         return InboxItem.objects.all()
#
#     def perform_create(self, serializer):
#         admin_user = User.objects.first()
#         serializer.save(owner=admin_user)


class CurrentUserView(generics.RetrieveAPIView):
    """
    API-Endpunkt, um die Daten des aktuell eingeloggten Nutzers abzurufen.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
