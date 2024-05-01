import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { checkJWT } from '../../Utils/JWTAuth';
import { FaCheck, FaUser } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import './EditProfileModal.css';

const EditProfileModal = ({ profileData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState(profileData);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [phoneError, setPhoneError] = useState(false);
  const navigate = useNavigate();
  var response;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const capitalizedValue = capitalizeFirstLetter(value);
    if (name.includes('location.')) {
      const locationField = name.split('.')[1]; // Extract the nested field (e.g., addressLine1, city, state, zipcode)
      // Check for phone number validation
      if (name === 'phoneNumber') {
        const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
        setPhoneError(!phoneRegex.test(value));
      }
      setEditedData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locationField]: capitalizedValue,
        },
      }));
    } else if (name === 'phoneNumber') {
      // Handle phone number separately
      setEditedData((prevData) => ({
        ...prevData,
        contact: capitalizedValue,
      }));
    } else {
      setEditedData((prevData) => ({
        ...prevData,
        [name]: capitalizedValue,
      }));
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const handleSave = () => {
    // Check if all required fields are filled
    if (
      !editedData.name ||
      !editedData.phoneNumber ||
      !editedData.description ||
      !editedData.location.addressLine1 ||
      !editedData.location.city ||
      !editedData.location.state ||
      !editedData.location.zipcode
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    onSave(editedData, imageFile);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className='title-buttons-row'>
          <h2 className="upload-pet-title">Edit Shelter</h2>
          <div className='ds-buttons'>
            <button className="discard-button" onClick={handleCancel}>x Discard</button>
            <button className="save-button" type="submit" onClick={() => {
              response = checkJWT();

              response.then(function (responseResult) {
                // If the JWT is valid
                if (responseResult.ok) {
                  handleSave();
                }

                // If the JWT is invalid
                else {
                  // Redirect user back to login page to refresh their JWT
                  alert("Your session has expired.\n\nPlease log back in to continue.");
                  navigate("/login");
                }
              }
              )
            }}><FaCheck></FaCheck>&nbsp;Save</button>
          </div>
        </div>


        <div className="dropzone" onClick={handleDropzoneClick}>
          {editedData.image ? (
            <img src={editedData.image} alt="Profile" className="profile-image" />
          ) : (
            <>
              <div className="dropzone-icon"><FaUser /></div>
              <p>Drop profile picture or click to browse</p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div>

        {editedData.image && (
          <div className="selected-images">
            <div className="selected-image">

              <button
                className="remove-image-button"
                onClick={() => {
                  response = checkJWT();

                  response.then(function (responseResult) {
                    // If the JWT is valid
                    if (responseResult.ok) {
                      setEditedData((prevData) => ({ ...prevData, image: null }));
                    }

                    // If the JWT is invalid
                    else {
                      // Redirect user back to login page to refresh their JWT
                      alert("Your session has expired.\n\nPlease log back in to continue.");
                      navigate("/login");
                    }
                  }
                  )
                }}>
                <div className='remove-pp'>Remove Profile Picture</div>
              </button>
            </div>
          </div>
        )}

        <div className="pet-details">
          <h4>Shelter Details</h4><br></br>
          <input
            type="text"
            name="name"
            placeholder='Shelter Name'
            value={editedData.name}
            onChange={handleInputChange}
            required
          />
          <InputMask
            mask="+1 (999) 999-9999"
            maskChar="_"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Phone Number"
            value={editedData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {phoneError && (
            <p className="error-message">
              Please enter a valid phone number in the format +1 (123) 456-7890
            </p>
          )}

          <textarea
            name="description"
            value={editedData.description}
            onChange={handleInputChange}
            placeholder="Tell us more about your shelter"
            maxLength={4096} // Set your desired maximum character limit here
            required
          /><br></br>
          <h4>Shelter Address</h4><br></br>
          <input
            type="text"
            name="location.addressLine1"
            placeholder="Address Line 1"
            value={editedData.location.addressLine1}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="location.addressLine2"
            placeholder="Address Line 2"
            value={editedData.location.addressLine2}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="location.city"
            placeholder='City'
            value={editedData.location.city}
            onChange={handleInputChange}
            required
          />
          <div className="pet-details-row">
            <input
              type="text"
              name="location.state"
              value={editedData.location.state}
              placeholder='State'
              onChange={handleInputChange}
              required
            />

            <input
              type="number"
              name="location.zipcode"
              placeholder='Zipcode'
              value={editedData.zipcode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className='ds-buttons'>
          <button className="discard-button" onClick={handleCancel}>x Discard</button>
          <button className="save-button" type="submit" onClick={() => {
            response = checkJWT();

            response.then(function (responseResult) {
              // If the JWT is valid
              if (responseResult.ok) {
                handleSave();
              }

              // If the JWT is invalid
              else {
                // Redirect user back to login page to refresh their JWT
                alert("Your session has expired.\n\nPlease log back in to continue.");
                navigate("/login");
              }
            }
            )
          }}><FaCheck></FaCheck>&nbsp;Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
