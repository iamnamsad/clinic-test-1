from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import appoinment
from ..serializers import appoinment_serializer

class AppointmentView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk=None):
        if pk is not None:
            # Get single appointment
            appointment = get_object_or_404(Booking, pk=pk, user=request.user)
            serializer = BookingSerializer(appointment)
            return Response({
                'status': 'success',
                'data': serializer.data
            })
        else:
            # Get all appointments for the user (if no ID provided)
            appointments = Booking.objects.filter(user=request.user).select_related('doctor')
            serializer = BookingSerializer(appointments, many=True)
            return Response({
                'status': 'success',
                'count': len(serializer.data),
                'data': serializer.data
            })
    
    def post(self, request):
        serializer = BookingSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({
                'status': 'success',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'error',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class UserAppointmentListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        appointments = Booking.objects.filter(
            user=request.user
        ).select_related('doctor')
        
        serializer = BookingSerializer(appointments, many=True)
        return Response({
            'status': 'success',
            'count': len(serializer.data),
            'data': serializer.data
        })