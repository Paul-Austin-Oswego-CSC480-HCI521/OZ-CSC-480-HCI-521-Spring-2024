import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UploadPetForm from './UploadPetForm';
import AvailablePets from './AvailablePets';
import CategoryFilter from './CategoryFilter';
import './ShelterDashboard.css';
import { NavLink as Link } from "react-router-dom";
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import EditProfileModal from './EditProfileModal';

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

  const [selectedCategory, setSelectedCategory] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Clear authentication token or session cookie here

    // Redirect to logout route or homepage
    window.location.href = '/shelter';
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      // Send a DELETE request to your backend API to delete the account


    }
  };


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

  const filterPetsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredPets = selectedCategory
    ? data.pets.filter((pet) => pet.type === selectedCategory)
    : data.pets;

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const saveProfileChanges = (editedProfileData) => {
    // Update the profile data
    const updatedData = {
      ...data,
      shelter: {
        ...data.shelter,
        ...editedProfileData,
      },
    };
    setData(updatedData);
    updateDataJson(updatedData);
    setShowEditModal(false);
  };


  return (
    <div className="wholepage">
      <div className="top-nav-container">
        <div className="top-nav">
          <Link to="/" className={({ isActive }) => (isActive ? "active" : "inactive")}>
            <IoPawSharp /> Adopt
          </Link>
          <Link to="/shelter" className='active'>
            <BsHouseHeartFill /> Shelter
          </Link>
        </div>
      </div>
      <div className="topnav">
        <div className="logo-container">
          <a href="/your-link-here" className="logo-link">
            
          </a>
        </div>
        <div className="upload-pet">
          <UploadPetForm addNewPet={addNewPet} />
        </div>
        <div className="user-profile-dropdown">
          <button onClick={toggleDropdown} className="profile-button">
            <div className="profile-icon">
              <BsPersonCircle /> {/* Circular profile picture icon */}
              <AiOutlineMenu /> {/* Three bars icon */}
            </div>
          </button>
        {showDropdown && (
            <div className="dropdown-content">
              <button className='edit' onClick={openEditModal}>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleDeleteAccount} className='deleteAccount'>Delete My Account</button>
            </div>
          )}
        </div>
      </div>
      <CategoryFilter
        onSelectCategory={filterPetsByCategory}
        selectedCategory={selectedCategory}
      />
      <div className="main-content">
        <div className="shelter-profile">
          <div>
            <img
              src={data.shelter.image}
              alt={data.shelter.name}
              className="shelter-image"
            />

          </div>

          <div>
            <h2 className="shelter-name">{data.shelter.name}<img className='verified' src='./Images/verified.png' alt=""></img></h2>
            <p className="shelter-location">{data.shelter.location}</p>
            <p className="shelter-description">
              {expanded ? data.shelter.description : `${data.shelter.description.slice(0, 125)}...`}
              {!expanded && <span onClick={toggleDescription}>See More</span>}
            </p>
          </div>
          <div className='upload'>
            <UploadPetForm />
          </div>
          <div className="shelteredit">
            <div className='edit' onClick={openEditModal}>
              <FaPencilAlt /> Edit Profile
            </div>
          </div>

        </div>

        <div className="availablepets">
          <AvailablePets pets={filteredPets} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        {showEditModal && (

          <EditProfileModal
            profileData={data.shelter}
            onSave={saveProfileChanges}
            onCancel={closeEditModal}
          />
        )}
      </div>
    </div >
  );
};

export default ShelterDashboard;
