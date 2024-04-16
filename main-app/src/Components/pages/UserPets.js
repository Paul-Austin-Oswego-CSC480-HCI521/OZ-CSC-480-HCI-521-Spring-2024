import React from 'react';
import './card.css';


const UserPets = ({ pets}) => {
  

  return (

    <div className="pet-list">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          
          {pet.images.length > 0 && (
            <img
              src={process.env.PUBLIC_URL + pet.images[0]}
              alt={pet.name}
              className="pet-image"
            />
          )}
          <div className="pet-details">
            <h3 className="pet-name">{pet.name}</h3>
            <p className="pet-breed">{pet.breed}</p>
            <div className="pet-info">
              <span className="pet-age">{pet.age}</span>
            </div>
          </div>
        </div>
      ))}

      
    </div>
  );
};

export default UserPets;
