import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { checkJWT } from '../../Utils/JWTAuth';
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
import EditProfileModal from './EditProfileModal';
import { FaUser } from 'react-icons/fa';
import { deleteCookies, getCookie } from '../../Utils/CookieUtils';

const ShelterDashboard = () => {
  const navigate = useNavigate();
  var response;

  const [data, setData] = useState({
    shelter: {
      name: '',
      image: '',
      location: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: ''
      },
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
    deleteCookies();
    // Redirect to logout route or homepage
    navigate("/shelter");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      // Send a DELETE request to your backend API to delete the account
      // console.log(document.cookie);
      const shelterID = getCookie("shelterID");
      // console.log(cookie.shelterID);

      // TODO: also needs to delete all pets in shelter; currently only deleting the shelter entry.
      const response = await fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/shelter/" + shelterID, {
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
    // if (getCookie("shelterID") == "") {
    //   alert("You are not signed in as a shelter user.");
    //   navigate("/shelter");
    //   return;
    // }

    const currentShelterId = getCookie("shelterID");

    //const currentShelterId = getCookie("shelterID");
    console.log(currentShelterId)
    const shelterData = await fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/shelter/" + currentShelterId, {
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
    const shelterID = getCookie("shelterID");
    console.log(shelterID);
    newPet.currentShelterId = shelterID;
    console.log(newPet);
    // console.log(getCookie("shelterID"));
    fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/pet", {
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
          const newPet = await response.json();
          // const newPet = 
          // console.log(response);
          // console.log(newPet)
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
    const shelterID = getCookie("shelterID");
    //const cookie = JSON.parse(document.cookie);
    fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/shelter/" + shelterID, {
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
    console.log("pet id" + petId);
    console.log(petId.id);

    // dumb hack because entire pet object is petId before refresh, and petId after (something about setData/fetch?)
    // if (petId.id != undefined) {
    //   petId = petId.id;
    // }
    const updatedPets = data.pets.filter((pet) => pet.id !== petId);
    const updatedData = { ...data, pets: updatedPets };

    // const shelterID = JSON.parse(document.cookie).shelterID;

    console.log(petId);

    const response = await fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/pet/" + petId, {
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
    // editedPetClone.images = editedPet.images[0];

    // const cookie = JSON.parse(document.cookie);
    console.log(JSON.stringify(editedPetClone))
    // console.log("my edited pet" + editedPet.id);
    fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/pet/" + editedPet.id, {
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
          <Link to="/viewdash" className='active'>
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
            <Link to="/viewdash" className="home-icon">
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
                {/* <Link to="/shelter">View Dashboard
                </Link> */}
                <button className='edit' onClick={() => {
                  response = checkJWT();

                  response.then(function (responseResult) {
                    // If the JWT is valid
                    if (responseResult.ok) {
                      openEditModal();
                    }
          
                    // If the JWT is invalid
                    else {
                      // Redirect user back to login page to refresh their JWT
                      alert("Your session has expired.\n\nPlease log back in to continue.");
                      navigate("/login");
                    }
                  }
                  )
                }}>Edit Profile</button>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={() => {
                  response = checkJWT();

                  response.then(function (responseResult) {
                    // If the JWT is valid
                    if (responseResult.ok) {
                      handleDeleteAccount();
                    }
          
                    // If the JWT is invalid
                    else {
                      // Redirect user back to login page to refresh their JWT
                      alert("Your session has expired.\n\nPlease log back in to continue.");
                      navigate("/login");
                    }
                  }
                  )
                }} className='deleteAccount'>Delete My Account</button>
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
            {data.shelter.image ? (
              <img
                src={data.shelter.image}
                alt="Shelter"
                className="shelter-image"
              />
            ) : (
              <FaUser className="shelter-image default-icon" />
            )}

          </div>

          <div>
            <h2 className="shelter-name">{data.shelter.name}<img className='verified' src='./images/verified.png' alt=""></img></h2>
            <p className="shelter-location">
              {data.shelter.location.addressLine1}{' '}
              {data.shelter.location.addressLine2 && (
                <React.Fragment>
                  {data.shelter.location.addressLine2}{' '}
                </React.Fragment>
              )}
              {data.shelter.location.city}, {data.shelter.location.state}
            </p>
            <br></br>
            <p className="shelter-description">
              {expanded ? data.shelter.description : `${data.shelter.description.slice(0, 125)}...`}
              {!expanded && <span onClick={toggleDescription}>See More</span>}
            </p>
          </div>
          <div className='upload'>
            <UploadPetForm addNewPet={addNewPet} />
          </div>
          <div className="shelteredit">
            <div className='edit' onClick={() => {
              response = checkJWT();

              response.then(function (responseResult) {
                // If the JWT is valid
                if (responseResult.ok) {
                  openEditModal();
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
