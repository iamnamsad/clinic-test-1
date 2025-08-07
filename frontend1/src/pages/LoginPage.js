 
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;