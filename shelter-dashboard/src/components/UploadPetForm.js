import React, { useState } from 'react';
import './UploadPetForm.css';

const UploadPetForm = ({ addNewPet }) => {
  const [pet, setPet] = useState({
    name: '',
    type: 'Dog', // Default value for the dropdown
    image: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPet((prevPet) => ({
        ...prevPet,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pet.name || !pet.image) {
      alert('Please enter the pet name and upload an image.');
      return;
    }
    addNewPet({
      id: Date.now(), // Assigning a unique ID using current timestamp
      ...pet,
    });
    setPet({
      name: '',
      type: 'Dog', // Reset the dropdown to default value
      image: '',
      description: '',
    });
  };

  return (
    <form className="upload-pet-form" onSubmit={handleSubmit}>
      <label>
        Pet Name:
        <input
          type="text"
          name="name"
          value={pet.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Pet Type:
        <select
          name="type"
          value={pet.type}
          onChange={handleInputChange}
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Fish">Fish</option>
          {/* Add more options for other pet types */}
        </select>
      </label>
      <label>
        Pet Image:
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={pet.description}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Upload Pet</button>
    </form>
  );
};

export default UploadPetForm;
