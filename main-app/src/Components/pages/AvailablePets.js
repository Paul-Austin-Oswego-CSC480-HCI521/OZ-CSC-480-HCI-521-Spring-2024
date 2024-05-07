import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { checkJWT } from '../../Utils/JWTAuth';
import { FaCheck, FaPlusSquare } from 'react-icons/fa';
import './UploadPetForm.css';
import './card.css';
import { Link } from 'react-router-dom';

const AvailablePets = ({ pets, onEdit, onDelete, onAdopt }) => {
  const [editingPet, setEditingPet] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showOptions, setShowOptions] = useState(null);
  const optionsRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  var response;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleDropzoneClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push(e.target.result);

        if (newImages.length === files.length) {
          setEditingPet((prevPet) => ({
            ...prevPet,
            images: [...prevPet.images, ...newImages],
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };


  const removeImage = (index) => {
    const updatedImages = [...editingPet.images];
    updatedImages.splice(index, 1);
    setEditingPet((prevPet) => ({
      ...prevPet,
      images: updatedImages,
    }));
  };





  const handleEditClick = (pet) => {
    setEditingPet({ ...pet });
    setShowPopup(true);
    setShowOptions(null);
  };

  const handleDeleteClick = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      onDelete(petId);
    }
  };

  const handleMarkAdopted = (petId) => {
    if (window.confirm('Are you sure you want to mark this pet as adopted?')) {
      onDelete(petId);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleToggleOptions = (petId) => {
    setShowOptions(showOptions === petId ? null : petId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onEdit(editingPet);

    // Check if any required field is empty
    // TODO: implement this in a way that works if u want it 
    if (
      false
      // editingPet.name.trim() === '' ||
      // editingPet.type.trim() === '' ||
      // editingPet.sex.trim() === '' ||
      // editingPet.age.trim() === '' ||
      // editingPet.breed.trim() === '' ||
      // editingPet.color.trim() === '' ||
      // editingPet.description.trim() === '' ||
      // editingPet.images.length === 0 // Check if images array is empty
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    setEditingPet({
      name: '',
      type: 'Dog',
      breed: '',
      color: '',
      sex: 'Male',
      images: [],
      size: 'Small',
      temperament: '',
      health: '',
      age: '',
      description: '',
      fileNames: [],
    });
    //fileInputRef.current.value = ''; // Clear the file input
    setShowPopup(false); // Close the popup after submission
    setEditingPet(null);
    setShowPopup(false);
  };

  const handleOptionsClick = (event, petId) => {
    event.stopPropagation();
    handleToggleOptions(petId);
  };

  if (!pets || pets.length === 0) {
    return (
      <div className="no-pets-message">
        <br></br> <br></br>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/images/Empty State - Shelter 1.png" alt="No pets available" />
          <h1 style={{ textAlign: 'center' }}>No pets here yet. They are off on a mini- vacation. Check back soon!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-list">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <div className="pet-card-options">
            {showOptions === pet.id && (
              <div className="pet-options-dropdown" ref={optionsRef}>
                <button onClick={() => {
                  response = checkJWT();

                  response.then(function (responseResult) {
                    // If the JWT is valid
                    if (responseResult.ok) {
                      handleEditClick(pet);
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
                  Edit Pet Details</button>
                {/* <button onClick={() => {
                  response = checkJWT();

                  response.then(function (responseResult) {
                    // If the JWT is valid
                    if (responseResult.ok) {
                      handleMarkAdopted(pet.id);
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
                  Mark as Adopted</button> */}
                <button onClick={() => {
                  response = checkJWT();

                  response.then(function (responseResult) {
                    // If the JWT is valid
                    if (responseResult.ok) {
                      handleDeleteClick(pet.id);
                    }

                    // If the JWT is invalid
                    else {
                      // Redirect user back to login page to refresh their JWT
                      alert("Your session has expired.\n\nPlease log back in to continue.");
                      navigate("/login");
                    }
                  }
                  )
                }} className='deletePet'>Delete Pet</button>
              </div>
            )}
            <button className="options-button" onClick={(e) => handleOptionsClick(e, pet.id)}>
              <div className="vertical-dots">&#8942;</div>
            </button>
          </div>
          <Link to={"/PetDetails/" + pet.id}>
            {pet.images && pet.images.length > 0 && (

              <div className="pet-images">
                {/* when uploading, pet list is stored in an array for some reason; when fetched, pet list not in array */}
                {Array.isArray(pet.images[0]) && pet.images[0].length > 0 ? (
                  <img src={pet.images[0][0]} alt={pet.name} className="pet-image" />
                ) : (
                  <img src={pet.images[0]} alt={pet.name} className="pet-image" />
                )}
              </div>

            )}
            <div className="pet-details">
              <h3 className="pet-name">{pet.name}</h3>
              <p className="pet-breed">{pet.breed}</p>
              <div className="pet-info">
                <span className="pet-age">{pet.age}&nbsp;year old</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {showPopup && (
        <>
          <form onSubmit={handleFormSubmit}>
            <div className="popup">
              <div className="popup-content">
                <div className='title-buttons-row'>
                  <h2 className="upload-pet-title">Edit Pet Details</h2>
                  <div className='ds-buttons'>
                    <button className="discard-button" onClick={handleClosePopup}>x Discard</button>
                    <button className="save-button" type="submit" onClick={(event) => {
                      response = checkJWT();

                      response.then(function (responseResult) {
                        // If the JWT is valid
                        if (responseResult.ok) {
                          handleFormSubmit(event);
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
                  <div className="dropzone-icon"><FaPlusSquare></FaPlusSquare></div>
                  <p>Drop your pet's photos or browse</p>
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

                {/* RIGHT HERE ALEX DON;T LOSE THIS */}

                <div className="selected-images">
                  {editingPet.images.map((image, index) => (
                    <div style={{ objectFit: "contain", maxWidth: "10%", maxHeight: "10%" }} key={index} className="selected-image">
                      <img key={index} src={image} alt={`Uploaded pet image #${index}`} className="pet-image" />
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
                  <input
                    type="text"
                    placeholder="Pet Name"
                    name="name"
                    value={editingPet.name}
                    onChange={handleFormChange}
                    required
                  />
                  <div className="pet-details-row">
                    <select
                      name="type"
                      placeholder="Pet Type"
                      value={editingPet.type}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Pet Type</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                    <select
                      name="sex"
                      placeholder="Pet Sex"
                      value={editingPet.sex}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Pet Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="pet-details-row">
                    <input
                      type="text"
                      placeholder="Pet Breed"
                      name="breed"
                      value={editingPet.breed}
                      onChange={handleFormChange}

                    />
                    <select
                      name="size"
                      placeholder="Pet Size"
                      value={editingPet.size}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Pet Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>

                  </div>
                  <div className="pet-details-row">
                    <input
                      type="text"
                      placeholder="Temperament"
                      name="temperament"
                      value={editingPet.temperament}
                      onChange={handleFormChange}

                    />
                    <input
                      type="text"
                      placeholder="Health"
                      name="health"
                      value={editingPet.health}
                      onChange={handleFormChange}

                    />

                  </div>
                  <input
                    type="number"
                    placeholder="Pet Age"
                    name="age"
                    value={editingPet.age}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pet Color"
                    name="color"
                    value={editingPet.color}
                    onChange={handleFormChange}

                  />
                  <textarea
                    name="description"
                    placeholder="Tell us more about your pet"
                    value={editingPet.description}
                    onChange={handleFormChange}
                    maxLength={4096} // Set your desired maximum character limit here
                  />
                  <div className='ds-buttons'>
                    <button className="discard-button" onClick={handleClosePopup}>x Discard</button>
                    <button className="save-button" type="submit" onClick={(event) => {
                      response = checkJWT();

                      response.then(function (responseResult) {
                        // If the JWT is valid
                        if (responseResult.ok) {
                          handleFormSubmit(event);
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
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AvailablePets;
