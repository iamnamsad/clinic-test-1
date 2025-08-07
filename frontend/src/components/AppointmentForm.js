import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createAppointment } from '../api/appointments';
import { AuthContext } from '../context/AuthContext';

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
      <Modal show={true} onHide={onClose} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-success mb-0">
            Appointment booked successfully!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Book Appointment with Dr. {doctor.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Appointment Date</Form.Label>
            <Form.Control
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>

          {error && (
            <div className="alert alert-danger">
              {typeof error === 'object' ? (
                Object.entries(error).map(([key, value]) => (
                  <div key={key}>{value}</div>
                ))
              ) : (
                <div>{error}</div>
              )}
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentForm;