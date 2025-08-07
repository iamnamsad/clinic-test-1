import React, { useContext, useEffect, useState } from 'react';
import { getAppointments } from '../api/appointments';
import { AuthContext } from '../context/AuthContext';
import AppointmentList from '../components/AppointmentList';

const AppointmentsPage = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments(token);
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to load appointments');
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="appointments-page">
      <h1>Your Appointments</h1>
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default AppointmentsPage;