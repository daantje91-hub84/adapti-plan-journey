from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Milestone, Task, InboxItem, UserProfile

# Wichtig: Wir brauchen Serializer für jedes Modell, das wir in der API verwenden wollen.

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'is_completed', 'created_at']

class MilestoneSerializer(serializers.ModelSerializer):
    # Wir nisten die Aufgaben direkt in die Meilensteine
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Milestone
        fields = ['id', 'name', 'description', 'weight', 'is_completed', 'tasks']

class ProjectSerializer(serializers.ModelSerializer):
    # Wir nisten die Meilensteine direkt in die Projekte
    milestones = MilestoneSerializer(many=True, read_only=True)
    # Wir holen den Namen des Besitzers, nicht nur die ID
    owner_username = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Project
        # Felder an das neue models.py angepasst
        fields = ['id', 'name', 'description', 'daily_task_goal', 'created_at', 'owner_username', 'milestones']

class InboxItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InboxItem
        fields = ['id', 'content', 'created_at']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['theme_color']

class UserSerializer(serializers.ModelSerializer):
    # Wir nisten das UserProfile direkt in den User
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

