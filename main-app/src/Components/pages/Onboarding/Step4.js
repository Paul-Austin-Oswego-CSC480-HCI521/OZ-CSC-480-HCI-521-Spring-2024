import React from 'react';
import { useNavigate } from "react-router-dom";


const Step4 = ({ prevStep, formData }) => {
  const navigate = useNavigate();

  const { name, streetAddress, city, state, zipcode, emailAddress, phoneNumber, description, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the form fields
    const formDataToSend = {
      name,
      emailAddress,
      streetAddress,
      city,
      state,
      zipcode,
      phoneNumber,
      description,
      password,
    };

    console.log(formDataToSend);

    try {
      // TODO: implement actual location
      delete formDataToSend.streetAddress;
      // Send the form data as JSON to the endpoint
      const response = await fetch('http://localhost:9080/database-controller/api/shelter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      } else {
        //   if (1) {
        // Redirect to another component upon successful login
        navigate("/dashboard");
      }

      // alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Review Your Information</h2>
      <p><strong>Shelter Name:</strong> {name}</p>
      <p><strong>Contact Email:</strong> {emailAddress}</p>
      <p><strong>Address:</strong> {streetAddress}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>State:</strong> {state}</p>
      <p><strong>Zipcode:</strong> {zipcode}</p>
      <p><strong>Contact Phone:</strong> {phoneNumber}</p>
      <p><strong>Shelter Description:</strong> {description}</p>

      <div>
        <button onClick={prevStep}>Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Step4;
