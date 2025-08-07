 
import React from 'react';

const DoctorList = ({ doctors, onBookAppointment }) => {
  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="doctor-card">
          <h3>{doctor.name}</h3>
          <p>Speciality: {doctor.speciality}</p>
          <p>Department: {doctor.department}</p>
          <button onClick={() => onBookAppointment(doctor)}>
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;