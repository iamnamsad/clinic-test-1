from rest_framework import serializers
from ..models import appoinment, Doctor
from django.utils import timezone

class AppoinmentSerializer(serializers.ModelSerializer):
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(),
        source='doctor',
        write_only=True
    )
    doctor = serializers.StringRelatedField(read_only=True)  # Shows doctor's string representation
    
    class Meta:
        model = appoinment.Appoinment
        fields = [
            'id', 
            'patient_name', 
            'age', 
            'appointment_date', 
            'doctor', 
            'doctor_id',  # For input
            'user'
        ]
        read_only_fields = ['user', 'doctor']  # doctor is read-only, doctor_id is write-only
        
    def validate_appointment_date(self, value):
        """Validate that appointment date is not in the past"""
        if value < timezone.now().date():
            raise serializers.ValidationError(
                "Appointment date cannot be in the past"
            )
        return value
        
    def create(self, validated_data):
        """Ensure user is set from request context"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)