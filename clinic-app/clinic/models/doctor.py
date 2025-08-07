from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=255)
    speciality = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'doctors'
        
    def __str__(self):
        return f"{self.name} ({self.speciality})"