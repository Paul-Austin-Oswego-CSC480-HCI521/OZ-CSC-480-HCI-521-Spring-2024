import Select from 'react-select';
import React, { useEffect, useState } from "react";

import { items } from "./items";
import "./style.css";

export default function MultiFilters() {

  // Category button states
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);

  // Dropdown states
  const [selectedOption, setSelectedOption] = useState([]);

  // Category options
  let filters = ["Dog", "Cat", "Other"];

  // Handles changing category buttons
  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  // Handles changing dropdown options
  const handleChange = (option) => {
    setSelectedOption(option)
    console.log(option)
  };

  useEffect(() => {
    filterItems();
    // eslint-disable-next-line
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...items]);
    }
  };

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
          options={items}
          isMulti
          className='dropdown'
          onChange={handleChange}
          getOptionLabel={(option) => option.sex}
          getOptionValue={(option) => option.sex}
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
          options={items}
          isMulti
          className='dropdown'
          onChange={handleChange}
          getOptionLabel={(option) => option.color}
          getOptionValue={(option) => option.color}
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
          options={items}
          isMulti
          className='dropdown'
          onChange={handleChange}
          getOptionLabel={(option) => option.breed}
          getOptionValue={(option) => option.breed}
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
          options={items}
          isMulti
          className='dropdown'
          onChange={handleChange}
          getOptionLabel={(option) => option.age}
          getOptionValue={(option) => option.age}
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
            <img className="image" src= {item.image}/>
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
