from rest_framework import serializers
from .models.compte import CompteModel


class CompteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteModel
        fields= '__all__' 
