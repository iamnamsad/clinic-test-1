 
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getDoctors = async (token) => {
  const response = await axios.get(`${API_URL}/doctors/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};