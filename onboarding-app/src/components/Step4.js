import React from 'react';

const Step4 = ({ prevStep, formData }) => {
  const { shelterName, streetAddress, city, state, zipcode, contactEmail, contactPhone, about, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the form fields
    const formDataToSend = {
      shelterName,
      contactEmail,
      streetAddress,
      city,
      state,
      zipcode,
      contactPhone,
      about,
      password,
    };

    try {
      // Send the form data as JSON to the endpoint
      const response = await fetch('{endpoint}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Review Your Information</h2>
      <p><strong>Shelter Name:</strong> {shelterName}</p>
      <p><strong>Contact Email:</strong> {contactEmail}</p>
      <p><strong>Address:</strong> {streetAddress}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>State:</strong> {state}</p>
      <p><strong>Zipcode:</strong> {zipcode}</p>
      <p><strong>Contact Phone:</strong> {contactPhone}</p>
      <p><strong>Shelter Description:</strong> {about}</p>

      <div>
        <button onClick={prevStep}>Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Step4;
