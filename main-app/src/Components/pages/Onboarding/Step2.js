import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const Step2 = ({ nextStep, prevStep, formData, setForm }) => {
  const { streetAddress, city, state, zipcode, phoneNumber } = formData;
  const [phoneError, setPhoneError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });

    // Check for phone number validation
    if (name === 'phoneNumber') {
      const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
      setPhoneError(!phoneRegex.test(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneError) {
      nextStep();
    } else {
      console.log('Please enter a valid phone number');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label htmlFor="streetAddress"></label>
      <input
        type="text"
        name="streetAddress"
        id="streetAddress"
        placeholder="Street Address"
        value={streetAddress}
        onChange={handleChange}
        required
      />

      <label htmlFor="city"></label>
      <input
        type="text"
        name="city"
        id="city"
        placeholder="City"
        value={city}
        onChange={handleChange}
        required
      />

      <label htmlFor="state"></label>
      <input
        type="text"
        name="state"
        id="state"
        placeholder="State"
        value={state}
        onChange={handleChange}
        required
      />

      <label htmlFor="zipcode"></label>
      <input
        type="number"
        name="zipcode"
        id="zipcode"
        placeholder="Zipcode"
        value={zipcode}
        onChange={handleChange}
        required
      />

      <label htmlFor="phoneNumber"></label>
      <InputMask
        mask="+1 (999) 999-9999"
        maskChar="_"
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={handleChange}
        required
      />
      {phoneError && (
        <p className="error-message">
          Please enter a valid phone number in the format +1 (123) 456-7890
        </p>
      )}

      <div className="signup-buttons-container">
        <button onClick={prevStep}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step2;
