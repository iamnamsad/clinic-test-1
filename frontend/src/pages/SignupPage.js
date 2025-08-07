import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(email, password); // Automatically log in after successful signup
        navigate('/doctors');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <div className="error-message">{error}</div>}
      <SignupForm onSignup={handleSignup} />
    </div>
  );
};

export default SignupPage;