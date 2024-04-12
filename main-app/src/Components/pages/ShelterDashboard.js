import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UploadPetForm from './UploadPetForm';
import AvailablePets from './AvailablePets';
import CategoryFilter from './CategoryFilter';
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


  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expanded, setExpanded] = useState(false);


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
    // const updatedPets = [...data.pets, { id: Date.now(), ...newPet }];
    // const updatedData = { ...data, pets: updatedPets };

    console.log(newPet);
    fetch("http://0.0.0.0:9080/database-controller/api/pet", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPet),
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
    // setData(updatedData);
    // updateDataJson(updatedData);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const updateDataJson = (updatedData) => {
    fetch("http://0.0.0.0:9080/database-controller/api/pet", {
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
    updateDataJson(updatedData);
  };

  const handleEdit = (editedPet) => {
    const updatedPets = data.pets.map((pet) =>
      pet.id === editedPet.id ? editedPet : pet
    );
    const updatedData = { ...data, pets: updatedPets };
    setData(updatedData);
    updateDataJson(updatedData);
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
    setEditMode(false);
  };

  const filterPetsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredPets = selectedCategory
    ? data.pets.filter((pet) => pet.type === selectedCategory)
    : data.pets;

  return (
    <div className="wholepage">
      <div className="topnav">
        <div>
          <a href="/" className="logo-link">
            <div className="logo-container"></div>
          </a>
        </div>
        <div>

          <UploadPetForm addNewPet={addNewPet} />
        </div>
      </div>
      <CategoryFilter
        onSelectCategory={filterPetsByCategory}
        selectedCategory={selectedCategory}
      />
      <div className="main-content">
        <div className="shelter-profile">
          <div>
            {editMode ? (
              <>
                <img src={data.shelter.image} alt={data.shelter.name} className='edit-image' />
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  class="custom-file-input"
                />

              </>
            ) : (
              <img
                src={data.shelter.image}
                alt={data.shelter.name}
                className="shelter-image"
              />
            )}
          </div>
          <div className="shelteredit">
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
                <textarea
                  name="description"
                  value={data.shelter.description}
                  onChange={handleInputChange}
                />
                <button onClick={saveChanges}>Save Changes</button>
              </>
            ) : (
              <>
                <h2 className="shelter-name">{data.shelter.name}<img className='verified' src='./images/verified.png'></img></h2>
                <p className="shelter-location">{data.shelter.location}</p>
                <p className="shelter-description">
                  {expanded ? data.shelter.description : `${data.shelter.description.slice(0, 125)}...`}
                  {!expanded && <span onClick={toggleDescription}>See More</span>}
                </p>
              </>
            )}
          </div>
          <div className='upload'>
            <UploadPetForm />
          </div>
          <div className='edit' onClick={toggleEditMode}>
            <FaPencilAlt /> Edit Profile
          </div>

        </div>

        <div className="availablepets">
          <AvailablePets pets={filteredPets} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;
