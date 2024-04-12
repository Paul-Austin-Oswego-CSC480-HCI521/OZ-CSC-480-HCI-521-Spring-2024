import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ onSelectCategory, selectedCategory }) => {
    const categories = ['Dog', 'Cat', 'Bird', 'Small Critter'];
  
    const handleCategoryClick = (category) => {
      if (selectedCategory === category) {
        onSelectCategory('');
      } else {
        onSelectCategory(category);
      }
    };
  
    return (
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {selectedCategory === category && (
              <span className="deselect" onClick={(e) => {
                e.stopPropagation();
                onSelectCategory('');
              }}>
                &#10006;
              </span>
            )}
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default CategoryFilter;