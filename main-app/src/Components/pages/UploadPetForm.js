import React, { useState } from 'react';
import { FaUpload} from 'react-icons/fa';
import './UploadPetForm.css';

const UploadPetForm = ({ addNewPet }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [pet, setPet] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    color: '',
    sex: 'Male',
    images: [], // Array to store uploaded images
    size: 'Small',
    age: '',
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
    const files = event.target.files;
    const imageArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (imageArray.length === files.length) {
          setPet((prevPet) => ({
            ...prevPet,
            images: imageArray,
          }));
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pet.name || pet.images.length === 0) {
      alert('Please enter the pet name and upload at least one image.');
      return;
    }

    addNewPet({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      color: pet.color,
      sex: pet.sex,
      images: pet.images,
      size: pet.size,
      age: pet.age,
      description: pet.description,
    });

    setPet({
      name: '',
      type: 'Dog',
      breed: '',
      color: '',
      sex: 'Male',
      images: [],
      size: 'Small',
      age: '',
      description: '',
    });

    setShowPopup(false); // Close the popup after submitting
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button className="upload-pet-btn" onClick={() => setShowPopup(true)}>
      <FaUpload className="upload-icon" />&nbsp;
        Upload a Pet
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={handleClosePopup}>
            x 
            </span>
            <h2>Upload a Pet</h2>
            <form onSubmit={handleSubmit}>
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
                <select name="type" value={pet.type} onChange={handleInputChange}>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Fish">Small Critter</option>
                  {/* Add more options for other pet types */}
                </select>
              </label>
              <label>
                Breed:
                <input
                  type="text"
                  name="breed"
                  value={pet.breed}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Color:
                <input
                  type="text"
                  name="color"
                  value={pet.color}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Sex:
                <select name="sex" value={pet.sex} onChange={handleInputChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label>
                Size:
                <select name="size" value={pet.size} onChange={handleInputChange}>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </label>
              <label>
                Age:
                <input
                  type="text"
                  name="age"
                  value={pet.age}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Pet Images:
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  onChange={handleImageChange}
                  multiple // Allow multiple file selection
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
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPetForm;
