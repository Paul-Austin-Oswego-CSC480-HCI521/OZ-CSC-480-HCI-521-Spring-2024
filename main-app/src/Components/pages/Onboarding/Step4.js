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
      location: {
        addressLine1: streetAddress,
        city,
        state,
        zipcode
      },
      // streetAddress,
      // city,
      // state,
      // zipcode,
      phoneNumber,
      description,
      password,
    };

    console.log(formDataToSend);

    try {
      // TODO: implement actual location
      delete formDataToSend.streetAddress;
      console.log(formDataToSend);
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
        const responseJson = await response.json();
        // console.log(responseText);

        const cookieJsonKeys = Object.entries(responseJson)

        for (const entry of cookieJsonKeys) {
          const suffix = "path=/;";
          document.cookie = entry[0] + "=" + entry[1] + ";" + suffix;
        };


        console.log(document.cookie);

        // Extract both the JWT and the Shelter ID from the Response
        // const jwt = responseText.substring(0, responseText.indexOf(":"));
        // const shelter_id = responseText.substring(responseText.indexOf(":") + 1);

        // // Calculate the expiration date of the JWT
        // const expirationDate = new Date();
        // expirationDate.setDate(expirationDate.getDate() + 1);

        // Create three cookies: One that represents the current user logged in, one that represents the current user's JWT, and one that represents the current user's ID
        // document.cookie = "currentUser=" + email + "; expires=" + expirationDate + "; path=/";
        // document.cookie = email + "JWT=" + jwt + "; expires=" + expirationDate + "; path=/";
        // document.cookie = email + "ID=" + shelter_id + "; expires=" + expirationDate + "; path=/";

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

      <div className="signup-buttons-container">
        <button onClick={prevStep}>Back</button>
        <button type="submit">
          Finish
          <svg class="checkmark" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M9.54961 18L3.84961 12.3L5.27461 10.875L9.54961 15.15L18.7246 5.97498L20.1496 7.39998L9.54961 18Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Step4;
