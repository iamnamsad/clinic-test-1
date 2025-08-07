import React from 'react';
import ErrorMessage from './ErrorMessage';

const AppointmentList = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div className="appointment-list">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="appointment-card">
          <h3>{appointment.patient_name}</h3>
          <p>Age: {appointment.age}</p>
          <p>Doctor: {appointment.doctor}</p>
          <p>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;