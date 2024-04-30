import React, { useState, useEffect } from "react";
import UserPets from "./UserPets.js";
import CategoryFilter from "./CategoryFilter.js";
import "./ShelterDashboard.css";
import { Helmet } from "react-helmet";
import verified_shelter_image from "../images/verified.png";
import { useParams } from "react-router";

const UserBoard = () => {
  let { id } = useParams();

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

  const [shelter, setShelter] = useState({
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
  });

  const [pets, setPets] = useState(
    []
  )

  const [selectedCategory, setSelectedCategory] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchShelterData();
  }, []);

  const fetchShelterData = async () => {
    fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/shelter/" + id)
      .then((response) => response.json())
      .then((jsonData) => {
        setShelter(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching shelter data:', error);
      });

    const params = new URLSearchParams();
    params.set("current_shelter_id", id);
    params.set("page_size", 2000);
    console.log(params)
    fetch(process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/pet?" + params)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData)
        setPets(jsonData);
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
    ? pets.filter((pet) => pet.type === selectedCategory)
    : pets;

  return (
    <div className="wholepage">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Paws N Claws - Adopt Userboard</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
      <br></br>
      <CategoryFilter
        onSelectCategory={filterPetsByCategory}
        selectedCategory={selectedCategory}
      />
      <div className="main-content">
        <div className="shelter-profile">
          <div>
            <img
              src={shelter.image}
              alt="Shelter"
              className="shelter-image"
            />
          </div>

          <div>
            <h2 className="shelter-name">
              {shelter.name}
              <img
                className="verified"
                src={verified_shelter_image}
                alt=""
              ></img>
            </h2>
            <p className="shelter-location">
              {shelter.location.addressLine1}{" "}
              {shelter.location.addressLine2 && (
                <React.Fragment>
                  {shelter.location.addressLine2}{" "}
                </React.Fragment>
              )}
              {shelter.location.city}, {shelter.location.state}
            </p>
            <br></br>
            <p className="shelter-description">
              {expanded
                ? shelter.description
                : `${shelter.description.slice(0, 125)}...`}
              {!expanded && <span onClick={toggleDescription}>See More</span>}
            </p>
          </div>
        </div>

        <div className="availablepets">
          <UserPets pets={filteredPets} />
        </div>
      </div>
    </div>
  );
};

export default UserBoard;
