from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):
    """
    Dieses Modell repräsentiert ein Hauptprojekt oder Ziel eines Nutzers.
    """
    # Verknüpfung zum Django-Benutzermodell. Jedes Projekt gehört einem Nutzer.
    # `on_delete=models.CASCADE` bedeutet: Wenn der Nutzer gelöscht wird, werden auch seine Projekte gelöscht.
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')

    # Der Titel des Projekts, z.B. "Marathon unter 4 Stunden laufen"
    title = models.CharField(max_length=200)

    # Eine längere Beschreibung des Ziels (optional)
    description = models.TextField(blank=True, null=True)

    # Das Zieldatum für das Projekt (optional)
    deadline = models.DateField(blank=True, null=True)

    # Der aktuelle Fortschritt als Prozentzahl (von 0 bis 100)
    progress = models.IntegerField(default=0)

    # Zeitstempel, wann das Projekt erstellt wurde
    created_at = models.DateTimeField(auto_now_add=True)

    # Zeitstempel, wann das Projekt zuletzt aktualisiert wurde
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Diese Methode sorgt dafür, dass im Django-Admin-Bereich
        der Titel des Projekts angezeigt wird, was viel lesbarer ist.
        """
        return self.title

