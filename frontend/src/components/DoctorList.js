 
import React from 'react';

const DoctorList = ({ doctors, onBookAppointment }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="col">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">{doctor.name}</h5>
            </div>
            <div className="card-body">
              <p className="card-text"><strong>Speciality:</strong> {doctor.speciality}</p>
              <p className="card-text"><strong>Department:</strong> {doctor.department}</p>
            </div>
            <div className="card-footer bg-transparent">
              <button 
                onClick={() => onBookAppointment(doctor)}
                className="btn btn-success w-100"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;