 
import React, { useContext, useEffect, useState } from 'react';
import { getDoctors } from '../api/doctors';
import { AuthContext } from '../context/AuthContext';
import DoctorList from '../components/DoctorList';
import AppointmentForm from '../components/AppointmentForm';

const DoctorsPage = () => {
  const { token } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors(token);
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [token]);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="doctors-page">
      <h1>Doctors</h1>
      <DoctorList doctors={doctors} onBookAppointment={handleBookAppointment} />
      {showForm && (
        <AppointmentForm 
          doctor={selectedDoctor} 
          onClose={handleFormClose} 
        />
      )}
    </div>
  );
};

export default DoctorsPage;