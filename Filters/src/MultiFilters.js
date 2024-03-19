import Select from 'react-select';
import React, { useEffect, useState } from "react";

import { items } from "./items";
import "./style.css";

export default function MultiFilters() {

  // Category button states
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Dropdown states
  const [selectedSex, setSelectedSex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);

  // Filtered items states
  const [filteredItems, setFilteredItems] = useState(items);

  // Category options
  let filters = ["Dog", "Cat", "Other"];

  // Dropdown options
  const uniqueItems = (key) => {
    if (selectedFilters.length === 0) {
      const uniqueSet = new Set(items.flatMap((item) => item[key]).flat());
      return [...uniqueSet].map((value) => ({ value, label: value }));
    } else {
      let filteredItems = items.filter(item => selectedFilters.includes(item.category));
      const uniqueSet = new Set(filteredItems.flatMap((item) => item[key]).flat());
      return [...uniqueSet].map((value) => ({ value, label: value }));
    }
  };

  // Handles changing category buttons
  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  // Handle dropdown options changing
  const handleChangeSex = (selectedOption) => {
    setSelectedSex(selectedOption);
  };
  
  const handleChangeColor = (selectedOption) => {
    setSelectedColor(selectedOption);
  };
  
  const handleChangeBreed = (selectedOption) => {
    setSelectedBreed(selectedOption);
  };
  
  const handleChangeAge = (selectedOption) => {
    setSelectedAge(selectedOption);
  };

  // Filter items based on categories and dropdowns
  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory);
        if (selectedSex && selectedSex.length > 0) {
          temp = temp.filter((item) => selectedSex.some((sex) => item.sex.includes(sex.value)));
        }
        if (selectedColor && selectedColor.length > 0) {
          temp = temp.filter((item) => selectedColor.some((color) => item.color.includes(color.value)));
        }
        if (selectedBreed && selectedBreed.length > 0) {
          temp = temp.filter((item) => selectedBreed.some((breed) => item.breed.includes(breed.value)));
        }
        if (selectedAge && selectedAge.length > 0) {
          temp = temp.filter((item) => selectedAge.some((age) => item.age.includes(age.value)));
        }
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      let tempItems = [...items];
      if (selectedSex && selectedSex.length > 0) {
        tempItems = tempItems.filter((item) => selectedSex.some((sex) => item.sex.includes(sex.value)));
      }
      if (selectedColor && selectedColor.length > 0) {
        tempItems = tempItems.filter((item) => selectedColor.some((color) => item.color.includes(color.value)));
      }
      if (selectedBreed && selectedBreed.length > 0) {
        tempItems = tempItems.filter((item) => selectedBreed.some((breed) => item.breed.includes(breed.value)));
      }
      if (selectedAge && selectedAge.length > 0) {
        tempItems = tempItems.filter((item) => selectedAge.some((age) => item.age.includes(age.value)));
      }
      setFilteredItems(tempItems);
    }
  };

  useEffect(() => {
    filterItems();
    // eslint-disable-next-line
  }, [selectedFilters, selectedSex, selectedColor, selectedBreed, selectedAge]);

  return (
    <div>
      <div className="buttons-container">
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${
              selectedFilters?.includes(category) ? "active" : ""
            }`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="dropdowns-container">
        <Select
          placeholder = {'Sex'}
          value={selectedSex}
          options={uniqueItems("sex")}
          onChange={handleChangeSex}
          isMulti
          className='dropdown'
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: 'silver',
              primary: 'black',
            },
          })}
        />

        <Select
          placeholder = {'Color'}
          value={selectedColor}
          options={uniqueItems("color")}
          onChange={handleChangeColor}
          isMulti
          className='dropdown'
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: 'silver',
              primary: 'black',
            },
          })}
        />

        <Select
          placeholder = {'Breed'}
          value={selectedBreed}
          options={uniqueItems("breed")}
          onChange={handleChangeBreed}
          isMulti
          className='dropdown'
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: 'silver',
              primary: 'black',
            },
          })}
        />

        <Select
          placeholder = {'Age'}
          value={selectedAge}
          options={uniqueItems("age")}
          onChange={handleChangeAge}
          isMulti
          className='dropdown'
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: 'silver',
              primary: 'black',
            },
          })}
        />
      </div>

      <div className="buttons-container">
        {filteredItems.map((item, idx) => (
          <div key={`items-${idx}`} className="button">
            <p className="name">{item.name}</p>
            <img className="image" src= {item.image} alt ="Null"/>
            <p className="category">{item.category}</p>
            <p className="sex">{item.sex}</p>
            <p className="color">{item.color}</p>
            <p className="breed">{item.breed}</p>
            <p className="age">{item.age}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
