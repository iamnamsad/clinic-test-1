import React, { useState, useContext } from 'react';
import { createAppointment } from '../api/appointments'; // This import will now work
import { AuthContext } from '../context/AuthContext';
import ErrorMessage from './ErrorMessage';

const AppointmentForm = ({ doctor, onClose }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    patient_name: '',
    age: '',
    appointment_date: '',
    doctor_id: doctor.id
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createAppointment(formData, token);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.error || 
        error.response?.data?.message || 
        'Failed to book appointment'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="appointment-form">
        <div className="success-message">Appointment booked successfully!</div>
      </div>
    );
  }

  return (
    <div className="appointment-form">
      <h2>Book Appointment with Dr. {doctor.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name:</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Book'}
          </button>
          <button type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;