import React from "react";
import { useNavigate } from "react-router-dom";

const Step4 = ({ prevStep, formData }) => {
  const navigate = useNavigate();

  const {
    name,
    streetAddress,
    city,
    state,
    zipCode,
    emailAddress,
    phoneNumber,
    description,
    password,
  } = formData;
  let address = streetAddress + " " + city + " " + state + " " + zipCode;
  const accessToken =
    "pk.eyJ1IjoiaGpyb3NlMjkiLCJhIjoiY2x1MGFmbzNmMDJxYTJrbnAyY3J6MWN1NiJ9.T_K7aTjSSiqtAIeRbL5Msw";
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    zipCode +
    ".json?access_token=" +
    accessToken;
  let latitude = 0;
  let longitude = 0;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      latitude = data.features[0].geometry.coordinates[1];
      longitude = data.features[0].geometry.coordinates[0];
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error fetching data:", error);
    });

  // console.log(url);
  // console.log(data);
  // const line = JSON.stringify(data);
  // console.log(line);
  // const ind = line.indexOf('coordinates":[');
  // let coordString = line.substring(ind + 14, ind + 35);
  // coordString = coordString.substring(0, coordString.indexOf("]"));
  // let coords = [];
  // coords[1] = coordString.substring(0, coordString.indexOf(","));
  // coords[0] = coordString.substring(coordString.indexOf(",") + 1);

  // console.log(coords[0] + ", " + coords[1]);
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
        zipCode
      },
      // streetAddress,
      // city,
      // state,
      // zipCode,
      phoneNumber,
      description,
      password,
      latitude,
      longitude,
    };

    console.log(formDataToSend);

    try {
      // TODO: implement actual location
      delete formDataToSend.streetAddress;
      // Send the form data as JSON to the endpoint
      const response = await fetch(
        process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/shelter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );

      if (response.status == 500) {
        throw new Error("Failed to submit form data");
      } else if (response.status == 409) {
        alert("The email address entered is already associated with an existing account, please try another.")
      }
      else if (response.ok) {
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
      } else {
        // console.error("Error submitting form:", error);
        alert("There was a problem submitting the request, is the server down?");
      }

      // alert('Form submitted successfully!');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a problem submitting the request, is the server down?");

    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Review Your Information</h2>
      <p>
        <strong>Shelter Name:</strong> {name}
      </p>
      <p>
        <strong>Contact Email:</strong> {emailAddress}
      </p>
      <p>
        <strong>Address:</strong> {streetAddress}
      </p>
      <p>
        <strong>City:</strong> {city}
      </p>
      <p>
        <strong>State:</strong> {state}
      </p>
      <p>
        <strong>ZIP Code:</strong> {zipCode}
      </p>
      <p>
        <strong>Contact Phone:</strong> {phoneNumber}
      </p>
      <p>
        <strong>Shelter Description:</strong> {description}
      </p>

      <div className="signup-buttons-container">
        <button onClick={prevStep}>Back</button>
        <button type="submit">
          Finish
          <svg
            class="checkmark"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              d="M9.54961 18L3.84961 12.3L5.27461 10.875L9.54961 15.15L18.7246 5.97498L20.1496 7.39998L9.54961 18Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Step4;
