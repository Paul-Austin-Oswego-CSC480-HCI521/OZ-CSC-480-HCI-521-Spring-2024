import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UploadPetForm from './UploadPetForm';
import Carousel from './Carousel';
import './ShelterDashboard.css';

const ShelterDashboard = () => {
  const [data, setData] = useState({
    shelter: {
      name: '',
      image: '',
      location: '',
      contact: '',
      description: '',
    },
    pets: [],
  });

  useEffect(() => {
    fetchShelterData();
  }, []);

  const fetchShelterData = () => {
    fetch(process.env.PUBLIC_URL + '/data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching shelter data:', error);
      });
  };

  const addNewPet = (newPet) => {
    const updatedPets = [...data.pets, { id: Date.now(), ...newPet }];
    const updatedData = { ...data, pets: updatedPets };

    setData(updatedData);

    // Update data.json file with the new data
    fetch(process.env.PUBLIC_URL + '/data.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
        console.log('Data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateDataJson = (updatedData) => {
    fetch(process.env.PUBLIC_URL + '/data.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
        console.log('Data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleDelete = (petId) => {
    const updatedPets = data.pets.filter((pet) => pet.id !== petId);
    const updatedData = { ...data, pets: updatedPets };

    setData(updatedData);

    // Update data.json file with the updated data
    updateDataJson(updatedData);
  };

  const handleEdit = (editedPet) => {
    const updatedPets = data.pets.map((pet) =>
      pet.id === editedPet.id ? editedPet : pet
    );
    const updatedData = { ...data, pets: updatedPets };
    setData(updatedData);

    // Update data.json file with the new data
    fetch(process.env.PUBLIC_URL + '/data.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
        console.log('Data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      shelter: {
        ...prevData.shelter,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prevData) => ({
        ...prevData,
        shelter: {
          ...prevData.shelter,
          image: reader.result,
        },
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
        <div className="edit-icon" onClick={toggleEditMode}>
          <FaPencilAlt />
        </div>
        <div className="shelter-image">
          {editMode ? (
            <>
              <img src={data.shelter.image} alt={data.shelter.name} /><br></br><br></br>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
            </>
          ) : (
            <img src={data.shelter.image} alt={data.shelter.name} />
          )}
        </div>
        <div className="shelter-details">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={data.shelter.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                value={data.shelter.location}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="contact"
                value={data.shelter.contact}
                onChange={handleInputChange}
              />
              {/* Add more input fields for other details */}
              <textarea
                name="description"
                value={data.shelter.description}
                onChange={handleInputChange}
              />
              <button onClick={saveChanges}>Save Changes</button>
            </>
          ) : (
            <>
              <h2>{data.shelter.name}</h2>
              <p>
                <strong>Location:</strong> {data.shelter.location}
              </p>
              <p>
                <strong>Contact:</strong> {data.shelter.contact}
              </p>
              <p>
                <strong>About Us<br></br></strong>{data.shelter.description}
              </p>
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
        <Carousel pets={data.pets} onEdit={handleEdit} onDelete={handleDelete} />

      </div>
    </div>
  );
};

export default ShelterDashboard;
