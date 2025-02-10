import React, { useState } from 'react';

import { loginEmail } from '../../services/authService';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  // Local state for form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      // Make the API request to your backend to authenticate the user
      const token = await loginEmail(username,password)
    //   console.log("token gotten : "+token);
    
      if (token) {
        // Save the JWT token in localStorage or state
        localStorage.setItem('token', token);

        // Notify the parent component of successful login
        onLoginSuccess();
        
        // Close the popup
        onClose();
      }
    } catch (error) {
      setErrorMessage('Invalid credentials or server error.');
    }
  };

  // Close the popup
  const handleClose = () => {
    onClose();
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  if (!isOpen) return null; // Don't render the popup if it's not open

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={popupStyles.form}>
          <div style={popupStyles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={popupStyles.input}
              required
            />
          </div>
          <div style={popupStyles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={popupStyles.input}
              required
            />
          </div>

          {errorMessage && <p style={popupStyles.error}>{errorMessage}</p>}

          <div style={popupStyles.buttonGroup}>
            <button type="submit" style={popupStyles.submitButton}>Login</button>
            <button type="button" onClick={handleClose} style={popupStyles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles for the popup
const popupStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginPopup;