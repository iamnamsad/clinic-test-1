 
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login/`, {
    email,
    password
  });
  return response.data;
};