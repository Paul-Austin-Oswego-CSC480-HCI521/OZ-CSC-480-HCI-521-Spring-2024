import React, { useState, useEffect, useRef } from 'react';
import { FaUpload, FaCheck, FaPlusSquare } from 'react-icons/fa';
import './UploadPetForm.css';
import './card.css';

const AvailablePets = ({ pets, onEdit, onDelete, onAdopt }) => {
  const [editingPet, setEditingPet] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showOptions, setShowOptions] = useState(null);
  const optionsRef = useRef(null);
  const fileInputRef = useRef(null);

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
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push({ url: e.target.result, file });
        fileNames.push(file.name);

        if (newImages.length === files.length) {
          setEditingPet((prevPet) => ({
            ...prevPet,
            images: [...prevPet.images, ...newImages],
            fileNames: [...(prevPet.fileNames || []), ...fileNames], // Use default empty array if fileNames is null
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...editingPet.images];
    updatedImages.splice(index, 1);
    const updatedFileNames = [...editingPet.fileNames];
    updatedFileNames.splice(index, 1);
    setEditingPet((prevPet) => ({
      ...prevPet,
      images: updatedImages,
      fileNames: updatedFileNames,
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
      onAdopt(petId);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleToggleOptions = (petId) => {
    setShowOptions(showOptions === petId ? null : petId);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPet((prevPet) => ({
          ...prevPet,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditingPet((prevPet) => ({
        ...prevPet,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onEdit(editingPet);
    setEditingPet(null);
    setShowPopup(false);
  };

  const handleOptionsClick = (event, petId) => {
    event.stopPropagation(); // Prevents closing the options when clicking inside the dropdown
    handleToggleOptions(petId);
  };

  if (pets.length === 0) {
    return <div className="no-pets-message">No pets available at the moment.</div>;
  }

  return (
    <div className="pet-list">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <div className="pet-card-options" >
            {showOptions === pet.id && (
              <div className="pet-options-dropdown" ref={optionsRef}>
                <button onClick={() => handleEditClick(pet)}>Edit Pet Details</button>
                <button onClick={() => handleMarkAdopted(pet.id)}>Mark as Adopted</button>
                <button onClick={() => handleDeleteClick(pet.id)} className='deletePet'>Delete Pet</button>
              </div>
            )}
            <button className="options-button" onClick={(e) => handleOptionsClick(e, pet.id)}>
              <div className="vertical-dots">&#8942;</div>
            </button>
          </div>
          {pet.images.length > 0 && (
            <img
              src={process.env.PUBLIC_URL + pet.images[0]}
              alt={pet.name}
              className="pet-image"
            />
          )}
          <div className="pet-details">
            <h3 className="pet-name">{pet.name}</h3>
            <p className="pet-breed">{pet.breed}</p>
            <div className="pet-info">
              <span className="pet-age">{pet.age}</span>
            </div>
          </div>
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
                    <button className="save-button" type="submit" onClick={handleFormSubmit}><FaCheck></FaCheck>&nbsp;Save</button>
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
                <div className="pet-details">
                  <h4>Pet Details</h4><br></br>
                  <input
                    type="text"
                    placeholder="What’s your pet’s name?"
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
                      <option value="Fish">Small Critter</option>
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
                  <input
                    type="text"
                    placeholder="Pet Age"
                    name="age"
                    value={editingPet.age}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pet Breed"
                    name="breed"
                    value={editingPet.breed}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pet Color"
                    name="color"
                    value={editingPet.color}
                    onChange={handleFormChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Tell us more about your pet"
                    value={editingPet.description}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className='ds-buttons'>
                  <button className="discard-button" onClick={handleClosePopup}>x Discard</button>
                  <button className="save-button" type="submit" onClick={handleFormSubmit}><FaCheck></FaCheck>&nbsp;Save</button>
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
