from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    task = models.TextField()
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)