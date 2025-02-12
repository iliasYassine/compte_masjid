from django.shortcuts import render
import json
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.response import Response  
from rest_framework import status
from rest_framework.views import APIView
from .serializers import CompteSerializer
from .models import CompteModel
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from icecream import ic
import traceback;
 
# Create your views here.





class CompteAPIVIEW(APIView):
    def get(self,request,pk=None,format=None):
        ic("Compte le get ")
        if pk is not None:
            compte=get_object_or_404(CompteModel)  
            serializer=CompteSerializer(compte)
        else :
            compte=CompteModel.objects.all()
            serializer=CompteSerializer(compte,many=True)       
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,format=None):
        serializers=CompteSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data ,status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    