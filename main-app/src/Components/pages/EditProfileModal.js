// EditProfileModal.js

import React, { useState } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ profileData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState(profileData);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    onSave(editedData, imageFile);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={editedData.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={editedData.contact}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Image:
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Discard</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
