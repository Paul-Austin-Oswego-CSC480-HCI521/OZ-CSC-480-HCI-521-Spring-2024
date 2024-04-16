import React, { useState, useEffect } from 'react';
import UserPets from './UserPets.js';
import CategoryFilter from './CategoryFilter.js';
import Navbar from '../Navbar.js'
import './ShelterDashboard.css';

const UserBoard = () => {

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


  useEffect(() => {
    fetchShelterData();
  }, []);

  const fetchShelterData = async () => {
    fetch(process.env.PUBLIC_URL + '/data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching shelter data:', error);
      });

    
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const filterPetsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredPets = selectedCategory
    ? data.pets.filter((pet) => pet.type === selectedCategory)
    : data.pets;


  return (
    <div className='wholepage'>
        <Navbar></Navbar>
        <br></br><br></br>
      <CategoryFilter
        onSelectCategory={filterPetsByCategory}
        selectedCategory={selectedCategory}
      />
      <div className="main-content">
        <div className="shelter-profile">
          <div>
          
        <img
          src={data.shelter.image}
          alt="Shelter"
          className="shelter-image"
        />
      
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
          
        </div>

        <div className="availablepets">
          <UserPets pets={filteredPets}/>
        </div>
        
      </div>
    </div >
  );
};

export default UserBoard;
