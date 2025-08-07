from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Doctor
from ..serializers import DoctorSerializer
from django.shortcuts import get_object_or_404
from .base import AuthenticatedAPIView
from rest_framework.permissions import AllowAny

class DoctorListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        doctors = Doctor.objects.filter(is_active=True)
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


