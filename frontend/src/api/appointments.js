import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getAppointments = async (token) => {
  const response = await axios.get(`${API_URL}/appointments/list/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.data || []; // Handle nested data structure
};

export const createAppointment = async (appointmentData, token) => {
  const response = await axios.post(`${API_URL}/appointments/`, appointmentData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};