import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { userName, email, password };

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Registered Successfully!');
        navigate('/login')
        setUserName('');
        setEmail('');
        setPassword('');
        setErrorMessage(''); // Clear any previous error messages
        navigate(-1); // Navigate back
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Unable to connect to the server. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <button onClick={() => navigate(-1)} className="backBtn">{'<'}</button>
      <div className="signup-form">
        <h2>Sign Up</h2>
        {errorMessage && <p className="signup-error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
