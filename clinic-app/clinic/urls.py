from django.urls import path
from .views.auth_view import LoginView, SignupView, UserProfileView
from .views.doctor_view import DoctorListView
from .views.appoinment_view import AppointmentView, UserAppointmentListView

urlpatterns = [
    # Authentication endpoints
    path('users/signup/', SignupView.as_view(), name='signup'),
    path('users/login/', LoginView.as_view(), name='login'),
    path('users/me/', UserProfileView.as_view(), name='user-profile'),
    
    # Doctor endpoints
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('doctors/create/', DoctorListView.as_view(), name='doctor-create'),
    
    # Appointment endpoints
    path('appointments/', AppointmentView.as_view(), name='appointments'),
    path('appointments/<int:pk>/', AppointmentView.as_view(), name='appointment-detail'),
    path('appointments/list/', UserAppointmentListView.as_view(), name='user-appointments'),
]