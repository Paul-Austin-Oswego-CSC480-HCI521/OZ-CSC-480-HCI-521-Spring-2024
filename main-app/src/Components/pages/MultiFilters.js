import Select from "react-select";
import React, { useEffect, useState } from "react";
import FilterBackground from "../../Assets/Doggusearch1.png";
//import { items } from "./items";
import "./MultiFilters.css";
import { Link } from "react-router-dom";
import { useCategory } from "../CategoryContext";

export default function MultiFilters() {
  <style>{(document.body.style.backgroundColor = "#ffffff")}</style>;
  // Category button states
  const { selectedCategory } = useCategory();
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Dropdowns theme
  const customStyles = {
    placeholder: (defaultStyles, state) => ({
      ...defaultStyles,
      color: "black",
    }),

    option: (defaultStyles, state) => ({
      ...defaultStyles,
      backgroundColor: state.isFocused ? "orange" : "white",
    }),

    indicatorSeparator: () => {},

    dropdownIndicator: (defaultStyles, state) => ({
      ...defaultStyles,
      color: "black",
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),

    multiValueRemove: (defaultStyles, state) => ({
      ...defaultStyles,
      "&:hover": {
        backgroundColor: "transparent",
        color: "red"
      }
    }),

    clearIndicator: (defaultStyles, state) => ({
      ...defaultStyles,
      "&:hover": {
        backgroundColor: "transparent",
        color: "red"
      }
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      maxHeight: "100px",
      overflowY: "auto"
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "whitesmoke",
      color: "black",
      border: "none",
      boxShadow: "none",
      minHeight: "50px",
      maxHeight: "100px",
      overflow: "hidden",
      cursor: "pointer"
    })
  };

  // Dropdown states
  const [selectedSex, setSelectedSex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);

  // Filtered items states
  const [filteredItems, setFilteredItems] = useState(null);

  const fetchData = async () => {
    const params = new URLSearchParams();
    //params.set("current_shelter_id", currentShelterId);
    params.set("page_size", 50);
    if(selectedFilters.length !== 0){
      console.log("selectedFilters", selectedFilters);
      console.log(selectedBreed);
      console.log(selectedColor);
      console.log(selectedAge);
      if(selectedFilters[0] === "Small Critter"){
        params.set("type", "Fish");
      }
      else{
        params.set("type", selectedFilters[0]); 
      }
    }
    if(selectedAge !== null && selectedAge[0] !== undefined){
      //This is a mapped value? Has a label of 3 and a value of 3. Not sure how I would fix this and/or index it to send a GET request
      console.log(selectedAge[0].value);
      params.set("max_age", selectedAge[0].value);
    }
    if(selectedSex !== null && selectedSex[0] !== undefined){
      console.log(selectedSex[0].value);
      params.set("sex", selectedSex[0].value);
    }
    if(selectedColor !== null&& selectedColor[0] !== undefined){
      console.log(selectedColor[0].value);
      params.set("color", selectedColor[0].value);
    }
    if(selectedBreed !== null && selectedBreed[0] !== undefined){
      console.log(selectedBreed[0].value);
      params.set("breed", selectedBreed[0].value);
    }
    console.log(params);
    const petsData = await fetch("http://localhost:9080/database-controller/api/pet?" + params, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (petsData.ok) {
      var petData = []
      const pets = await petsData.json();
      console.log(pets);

      //console.log("pet data")
      //console.log(pets);
      for (var pet of pets) {
        //console.log(pet);
        pet.image = pet.images;
        petData.push(pet);
      }
      console.log(petData);
      // setData((prevState => ({ ...prevState, pets: petData })));
      setFilteredItems(pets);
      // console.log("data");
      // console.log(data);
      //console.log("filteredItems");
      //console.log(filteredItems);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedFilters, selectedAge, selectedBreed, selectedColor, selectedSex]);
  // Handles changing Category buttons

  // Category options
  let filters = ["Dog", "Cat", "Bird", "Small Critter"];

  // Dropdown options
  const uniqueItems = (key) => {
    if (selectedFilters.length === 0) {
      if (filteredItems == null) {
        return null;
      } else {
        const uniqueSet = new Set(filteredItems.flatMap((item) => item[key]).flat());
        return [...uniqueSet].map((value) => ({ value, label: value }));
      }
    } else {
      const filteredItemsByCategory = filteredItems.filter((item) =>
        selectedFilters.includes(item.category)
      );
      const uniqueSet = new Set(
        filteredItemsByCategory.flatMap((item) => item[key]).flat()
      );
      return [...uniqueSet].map((value) => ({ value, label: value }));
    }
  };

  // Handles changing category buttons
  const handleFilterButtonClick = (category) => {
    setSelectedFilters((prevFilters) => {
      // Toggle category on or off
      return prevFilters.includes(category)
        ? prevFilters.filter((f) => f !== category)
        : [...prevFilters, category];
    }); 
    console.log(category);
    //DO A FETCH HERE 
    //fetchData();
  };

  // Handle dropdown options changing
  const handleChangeSex = (selectedOption) => {
    setSelectedSex(selectedOption);
    console.log(selectedFilters);
    console.log(selectedOption);
    //fetchData();
  };

  const handleChangeColor = (selectedOption) => {
    setSelectedColor(selectedOption);
    console.log(selectedFilters);
    console.log(selectedOption);
    //fetchData();
  };

  const handleChangeBreed = (selectedOption) => {
    setSelectedBreed(selectedOption);
    console.log(selectedFilters);
    console.log(selectedOption);
    //fetchData();
  };

  const handleChangeAge = (selectedOption) => {
    setSelectedAge(selectedOption);
    console.log(selectedFilters);
    console.log(selectedOption);
    //fetchData();
  };


  <style>{(document.body.style.backgroundColor = "#E3EAE7")}</style>;

  return (
    <div className="DoYou">
      <h1>Your Furr-ever Friend <br/> Awaits</h1>
      <img className="filter-bannerDog" src={FilterBackground} alt="" />
      <div className="custom-container">
        <div className="buttons-container" id="filters-button">
          {filters.map((category, idx) => (
            <button
              onClick={() => handleFilterButtonClick(category)}
              className={`button-top ${selectedFilters?.includes(category) ? "active" : ""
                }`}
              key={`filters-${idx}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="dropdowns-container">
          <Select
            placeholder={"Sex"}
            value={selectedSex}
            options={uniqueItems("sex")}
            onChange={handleChangeSex}
            isMulti
            className="dropdownFilters"
            styles={customStyles}
          />

          <Select
            placeholder={"Color"}
            value={selectedColor}
            options={uniqueItems("color")}
            onChange={handleChangeColor}
            isMulti
            className="dropdownFilters"
            styles={customStyles}
          />

          <Select
            placeholder={"Breed"}
            value={selectedBreed}
            options={uniqueItems("breed")}
            onChange={handleChangeBreed}
            isMulti
            className="dropdownFilters"
            styles={customStyles}
          />

          <Select
            placeholder={"Age"}
            value={selectedAge}
            options={uniqueItems("age")}
            onChange={handleChangeAge}
            isMulti
            className="dropdownFilters"
            styles={customStyles}
          />
        </div>

        <div className="cards-container">
          {filteredItems != null ? filteredItems.map((item, idx) => (
            <Link
              to={`/PetDetails/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <div key={`items-${idx}`} className="card">
                <img className="image" src={item.image[0]} alt="Null" />
                <p className="name">{item.name}</p>
                <p className="breed">{item.breed}</p>
                {/* <p className="category">{item.category}</p> */}
                {/* <p className="sex">{item.sex}</p> */}
                {/* <p className="color">{item.color}</p> */}
                <p className="age">{item.age}</p>
              </div>
            </Link>
          )) : "No pets found :("}
        </div>
      </div>
    </div>
  );
}