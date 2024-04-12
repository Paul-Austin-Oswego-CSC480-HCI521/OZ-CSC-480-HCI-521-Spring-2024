import React, { useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import './card.css';


const AvailablePets = ({ pets, onEdit, onDelete }) => {
  const [editingPet, setEditingPet] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  

  const handleEditClick = (pet) => {
    setEditingPet({ ...pet });
    setShowPopup(true);
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

  const handleDeleteClick = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      onDelete(petId);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  

  return (

    <div className="pet-list">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <div className="pet-card-hover">
            <button className="edit-button" onClick={() => handleEditClick(pet)}>
              <FaPencilAlt />
            </button>
            <button className="delete-button" onClick={() => handleDeleteClick(pet.id)}>
              <FaTrashAlt />
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
              <span className="pet-distance">{pet.distance} away</span>
            </div>
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={handleClosePopup}>
              x 
            </span>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editingPet.name}
                onChange={handleFormChange}
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                value={editingPet.type}
                onChange={handleFormChange}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Small Scritter</option>
              </select>
              <label htmlFor="breed">Breed:</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={editingPet.breed}
                onChange={handleFormChange}
              />
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={editingPet.color}
                onChange={handleFormChange}
              />
              <label htmlFor="sex">Sex:</label>
              <select
                id="sex"
                name="sex"
                value={editingPet.sex}
                onChange={handleFormChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label htmlFor="size">Size:</label>
              <select
                id="size"
                name="size"
                value={editingPet.size}
                onChange={handleFormChange}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={editingPet.age}
                onChange={handleFormChange}
              />
              <label htmlFor="image">Picture:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFormChange}
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={editingPet.description}
                onChange={handleFormChange}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailablePets;
