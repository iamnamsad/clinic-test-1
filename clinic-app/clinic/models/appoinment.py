from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

class Appoinment(models.Model):
    patient_name = models.CharField(max_length=255)
    age = models.PositiveIntegerField()
    appointment_date = models.DateField()
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'appointments'
        
    def clean(self):
        if self.appointment_date < timezone.now().date():
            raise ValidationError("Appointment date cannot be in the past")
            
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.patient_name} - Doctor ID: {self.doctor.id}"