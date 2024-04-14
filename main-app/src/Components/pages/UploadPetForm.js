import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaCheck, FaPlusSquare } from 'react-icons/fa';
import { JWTAuth } from './JWTAuth';
import './UploadPetForm.css';

const UploadPetForm = ({ addNewPet }) => {
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const jwtAuth = new JWTAuth();
  var response;

  const [pet, setPet] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    color: '',
    sex: 'Male',
    images: [],
    size: 'Small',
    age: '',
    description: '',
    fileNames: [],
  });

  const handleDropzoneClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push({ url: e.target.result, file });
        fileNames.push(file.name);

        if (newImages.length === files.length) {
          setPet((prevPet) => ({
            ...prevPet,
            images: [...prevPet.images, ...newImages],
            fileNames: [...prevPet.fileNames, ...fileNames],
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...pet.images];
    updatedImages.splice(index, 1);
    const updatedFileNames = [...pet.fileNames];
    updatedFileNames.splice(index, 1);
    setPet((prevPet) => ({
      ...prevPet,
      images: updatedImages,
      fileNames: updatedFileNames,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const capitalizedValue = capitalizeFirstLetter(value); // Capitalize the input value
    setPet((prevPet) => ({
      ...prevPet,
      [name]: capitalizedValue,
    }));
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      pet.name.trim() === '' ||
      pet.type.trim() === '' ||
      pet.sex.trim() === '' ||
      pet.age.trim() === '' ||
      pet.breed.trim() === '' ||
      pet.color.trim() === '' ||
      pet.description.trim() === '' ||
      pet.images.length === 0 // Check if images array is empty
    ) {
      alert('Please fill in all required fields and upload at least one image.');
      return;
    }

    addNewPet(pet);
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
      fileNames: [],
    });
    fileInputRef.current.value = ''; // Clear the file input
    setShowPopup(false); // Close the popup after submission
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button className="upload-pet-btn" onClick={() => {
        response = jwtAuth.checkJWT();

        response.then(function(responseResult) {
          
          // If the JWT is valid
          if(responseResult.ok)
          {
              setShowPopup(true)
          }
      
          // If the JWT is invalid
          else
          {
              // Redirect user back to login page to refresh their JWT
              alert("Your session has expired.\n\nPlease log back in to continue.");
              navigate("/login");
          }
        }
      )
      }}>
        <FaUpload className="upload-icon" />&nbsp;
        Upload a Pet
      </button>

      {showPopup && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="popup-background" onClick={handleClosePopup}></div>
            <div className="popup">
              <div className="popup-content">
                <div className='title-buttons-row'>
                  <h2 className="upload-pet-title">Upload a Pet</h2>
                  <div className='ds-buttons'>
                    <button className="discard-button" onClick={handleClosePopup}>x Discard</button>
                    <button className="save-button" type="submit"><FaCheck></FaCheck>&nbsp;Upload</button>
                  </div>
                </div>
                <div className="dropzone" onClick={handleDropzoneClick}>
                  <div className="dropzone-icon"><FaPlusSquare></FaPlusSquare></div>
                  <p>Drag and drop an image here or click to browse</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <div className="selected-images">
                  {pet.fileNames.map((fileName, index) => (
                    <div key={index} className="selected-image">
                      <span>{fileName}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-button"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pet-details">
                  <h4>Pet Details</h4><br></br>
                  <input
                    type="text"
                    placeholder="What’s your pet’s name?"
                    name="name"
                    value={pet.name}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="pet-details-row">
                    <select
                      name="type"
                      placeholder="Pet Type"
                      value={pet.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Pet Type</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Fish">Small Critter</option>
                    </select>
                    <select
                      name="sex"
                      placeholder="Pet Sex"
                      value={pet.sex}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Pet Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Pet Age"
                    name="age"
                    value={pet.age}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pet Breed"
                    name="breed"
                    value={pet.breed}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pet Color"
                    name="color"
                    value={pet.color}
                    onChange={handleInputChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Tell us more about your pet"
                    value={pet.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='ds-buttons'>
                  <button className="discard-button" onClick={handleClosePopup}>x Discard</button>
                  <button className="save-button" type="submit"><FaCheck></FaCheck>&nbsp;Upload</button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default UploadPetForm;
