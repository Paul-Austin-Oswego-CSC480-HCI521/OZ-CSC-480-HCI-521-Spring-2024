import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import UploadPetForm from './UploadPetForm';
import AvailablePets from './AvailablePets';
import CategoryFilter from './CategoryFilter';
import './ShelterDashboard.css';
import { NavLink as Link } from "react-router-dom";
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineHome } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import EditProfileModal from './EditProfileModal';
import { getCookie } from '../../Utils/CookieUtils';

const ShelterDashboard = () => {
  const navigate = useNavigate();

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
    document.cookie = null;
    // Redirect to logout route or homepage
    navigate("/shelter");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      // Send a DELETE request to your backend API to delete the account
      // console.log(document.cookie);
      const cookie = JSON.parse(document.cookie);
      // console.log(cookie.shelterID);

      // TODO: also needs to delete all pets in shelter; currently only deleting the shelter entry.
      const response = await fetch("http://localhost:9080/database-controller/api/shelter/" + cookie.shelterID, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(getCookie("shelterID")),
      });

      if (response.ok) {
        // console.log(response)
        alert("successfully deleted account")
        handleLogout();
      } else {
        // TODO: handle else
      }
    }
  };


  useEffect(() => {
    fetchShelterData();
  }, []);

  const fetchShelterData = async () => {
    // fetch(process.env.PUBLIC_URL + '/data.json')
    //   .then((response) => response.json())
    //   .then((jsonData) => {
    //     setData(jsonData);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching shelter data:', error);
    //   });

    if (JSON.parse(document.cookie) == null) {
      alert("You are not signed in as a shelter user.");
      navigate("/shelter");
      return;
    }

    const currentShelterId = JSON.parse(document.cookie).shelterID;

    const shelterData = await fetch("http://localhost:9080/database-controller/api/shelter/" + currentShelterId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const params = new URLSearchParams();
    params.set("current_shelter_id", currentShelterId);
    params.set("page_size", 2000);
    const petsData = await fetch("http://localhost:9080/database-controller/api/pet?" + params, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (shelterData.ok) {
      var finalData = {};

      const shelterJson = await shelterData.json();

      finalData.shelter = shelterJson;
      finalData.pets = [];

      if (petsData.ok) {
        const petsJson = await petsData.json();

        for (var pet of petsJson) {
          // TODO: I THINK THIS WILL NEED TO BE DONE DIFFERENTLY ONCE MORE THAN ONE PET IS ALLOWED IN DATABASE 
          pet.images = [pet.images];
          finalData.pets.push(pet);
        }

        // finalData.pets = petsJson;
      } else {
        finalData.pets = [];
      }

      console.log(finalData);
      setData(finalData);
    }
  };

  const addNewPet = (newPet) => {
    // const updatedPets = [...data.pets, { id: Date.now(), ...newPet }];
    // const updatedData = { ...data, pets: updatedPets };

    // console.log(newPet);
    // console.log(JSON.parse(document.cookie).shelterID);
    const shelterID = JSON.parse(document.cookie).shelterID;
    console.log(shelterID);
    newPet.currentShelterId = shelterID;
    console.log(newPet);
    // console.log(getCookie("shelterID"));
    fetch("http://0.0.0.0:9080/database-controller/api/pet", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPet),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to update data');
        } else {
          // const json = await response.json();
          const updatedPets = [...data.pets, newPet];
          const updatedData = { ...data, pets: updatedPets };
          setData(updatedData);
          console.log('Data updated successfully');
        }
      })

      .catch((error) => {
        console.error('Error updating data:', error);
      });


    // updateDataJson(updatedData);
  };
  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const updateDataJson = (updatedData) => {
    delete updatedData.shelter.id;
    console.log(updatedData.shelter);
    const cookie = JSON.parse(document.cookie);
    fetch("http://0.0.0.0:9080/database-controller/api/shelter/" + cookie.shelterID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // ONLY SET THE SHELTER TO UPDATE HERE
      body: JSON.stringify(updatedData.shelter),
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

  const handleDelete = async (petId) => {
    const updatedPets = data.pets.filter((pet) => pet.id !== petId);
    const updatedData = { ...data, pets: updatedPets };

    // const shelterID = JSON.parse(document.cookie).shelterID;

    console.log(petId);

    const response = await fetch("http://localhost:9080/database-controller/api/pet/" + petId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(getCookie("shelterID")),
    });

    if (response.ok) {
      setData(updatedData);

      // console.log(response)
    } else {
      // TODO: handle else
    }



    // updateDataJson(updatedData);
  };

  const handleEdit = (editedPet) => {
    const updatedPets = data.pets.map((pet) =>
      pet.id === editedPet.id ? editedPet : pet
    );
    const updatedData = { ...data, pets: updatedPets };

    // needs to not send id in request, so make temp and delete
    const editedPetClone = structuredClone(editedPet);
    delete editedPetClone.id;
    editedPetClone.images = editedPet.images[0];

    // const cookie = JSON.parse(document.cookie);
    console.log(JSON.stringify(editedPetClone))
    // console.log("my edited pet" + editedPet.id);
    fetch("http://0.0.0.0:9080/database-controller/api/pet/" + editedPet.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPetClone),
    })

    setData(updatedData);


    // updateDataJson(updatedData);
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
        <div className="top-navbar">
          <Link to="/" className={({ isActive }) => (isActive ? "active" : "inactive")}>
            <IoPawSharp /> Adopt
          </Link>
          <Link to="/shelter" className='active'>
            <BsHouseHeartFill /> Shelter
          </Link>
        </div>
      </div>
      <div className="topnav">
        <div className="left-container">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img src="./images/loho.png" alt="logo" />
            </Link>
          </div>
          <div className="home-container">
            <Link to="/shelter" className="home-icon">
              <AiOutlineHome />
            </Link>
          </div>
        </div>
        <div className="right-container">
          <div className="upload-pet">
            <UploadPetForm addNewPet={addNewPet} />
          </div>
          <div className="user-profile-dropdown">
            <button onClick={toggleDropdown} className="profile-button">
              <div className="profile-icon">
                <span className="profile-icon-p"><BsPersonCircle /></span> {/* Circular profile picture icon */}
                <span className="profile-icon-b"><AiOutlineMenu /></span> {/* Three bars icon */}
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
            <h2 className="shelter-name">{data.shelter.name}<img className='verified' src='./images/verified.png' alt=""></img></h2>
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
