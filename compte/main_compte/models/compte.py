# Create your models h
from django.db import models


class CompteModel(models.Model):
    dons = models.IntegerField()
   
    
    class Meta:
        db_table = 'compte'

