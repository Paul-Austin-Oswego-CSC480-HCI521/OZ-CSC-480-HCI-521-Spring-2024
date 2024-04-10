import React, { useState } from 'react';

const Step1 = ({ nextStep, formData, setForm }) => {
  const { name, emailAddress, password, password2 } = formData;
  const [passwordError, setPasswordError] = useState(''); // State for password error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label htmlFor="shelter-name">Shelter Name:</label>
      <input
        type="text"
        name="name"
        id="shelter-name"
        value={name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="emailAddress"
        id="email"
        value={emailAddress}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
        required
      />

      <label htmlFor="password2">Re-enter Password:</label>
      <input
        type="password"
        name="password2"
        id="password2"
        value={password2}
        onChange={handleChange}
        required
      />

      {passwordError && <p className="error-message">{passwordError}</p>} {/* Display error message */}

      <div>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step1;
