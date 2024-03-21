import React, { useState } from 'react';
import UploadPetForm from './UploadPetForm';
import Carousel from './Carousel';
import './ShelterDashboard.css';

const ShelterDashboard = () => {
  const [shelter, setShelter] = useState({
    name: 'Pawsome Shelter',
    image: process.env.PUBLIC_URL + '/Images/Shelter/s2.jfif',
    location: '123 Street, Pawsome City, NY',
    contact: 'Email: pawsome@gmail.com | Phone: +3151234567',
    description: `Welcome to Our Pet Shelter! We are dedicated to providing a safe 
      and loving environment for animals in need. Our shelter is home to a variety 
      of furry friends waiting to find their forever homes. Whether you're looking 
      for a playful pup or a cuddly kitten, we have pets of all ages, sizes, and 
      breeds. Our team of dedicated staff and volunteers work tirelessly to ensure 
      that each animal receives the care, attention, and love they deserve.`,
    pets: [
      {
        id: 1,
        name: 'Googoo',
        image: process.env.PUBLIC_URL + '/Images/Pets/p1.webp',
      },
      {
        id: 2,
        name: 'Kimchi',
        image: process.env.PUBLIC_URL + '/Images/Pets/p3.webp',
      },
      {
        id: 3,
        name: 'Otis',
        image: process.env.PUBLIC_URL + '/Images/Pets/p6.webp',
      },
      {
        id: 4,
        name: 'Snowball',
        image: process.env.PUBLIC_URL + '/Images/Pets/p4.webp',
      },
    ],
  });

  const addNewPet = (newPet) => {
    setShelter({
      ...shelter,
      pets: [...shelter.pets, newPet],
    });
  };

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShelter((prevShelter) => ({
      ...prevShelter,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setShelter((prevShelter) => ({
        ...prevShelter,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    // Here you can add logic to save the changes, like sending an API request
    setEditMode(false);
  };

  return (
    <div className="shelter-dashboard">
      <div className="shelter-info">
        <div className="shelter-image">
          {editMode ? (
            <>
              <img src={shelter.image} alt={shelter.name} /><br></br><br></br>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
            </>
          ) : (
            <img src={shelter.image} alt={shelter.name} />
          )}
        </div>
        <div className="shelter-details">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={shelter.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                value={shelter.location}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="contact"
                value={shelter.contact}
                onChange={handleInputChange}
              />
              {/* Add more input fields for other details */}
              <textarea
                name="description"
                value={shelter.description}
                onChange={handleInputChange}
              />
              <button onClick={saveChanges}>Save Changes</button>
            </>
          ) : (
            <>
              <h2>{shelter.name}</h2>
              <p>
                <strong>Location:</strong> {shelter.location}
              </p>
              <p>
                <strong>Contact:</strong> {shelter.contact}
              </p>
              <p>
                <strong>About Us<br></br></strong>{shelter.description}
                </p>
              <button onClick={toggleEditMode}>Edit Details</button>
            </>
          )}
        </div>
        <br></br>
      </div>
      <UploadPetForm
          addNewPet={addNewPet}
          onClose={() => setEditMode(false)}
        /><br></br>
      <div className="pet-carousel">
        <h3>Available Pets</h3>
        <Carousel pets={shelter.pets} />
      </div>
    </div>
  );
};

export default ShelterDashboard;
