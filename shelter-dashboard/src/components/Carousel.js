import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import './Carousel.css';

const Carousel = ({ pets, onEdit, onDelete }) => {
  const [editingPet, setEditingPet] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const PrevArrow = ({ onClick }) => (
    <button className="carousel-arrow carousel-prev" onClick={onClick}>
      <FaAngleLeft />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className="carousel-arrow carousel-next" onClick={onClick}>
      <FaAngleRight />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 4 pets per slide
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  const handleEditClick = (pet) => {
    setEditingPet({ ...pet });
    setShowPopup(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPet((prevPet) => ({
          ...prevPet,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditingPet((prevPet) => ({
        ...prevPet,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onEdit(editingPet);
    setEditingPet(null);
    setShowPopup(false);
  };

  const handleDeleteClick = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      onDelete(petId);
    }
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {pets.map((pet) => (
          <div key={pet.id} className="carousel-item">
            {pet.images.length > 0 && (
              <img
                src={process.env.PUBLIC_URL + pet.images[0]}
                alt={pet.name}
                className="carousel-image"
              />
            )}
            <div className="carousel-item-content">
              <h4>{pet.name}</h4>
              <button onClick={() => handleEditClick(pet)} className="edit-button">
                <FaPencilAlt></FaPencilAlt>
              </button>
              <button onClick={() => handleDeleteClick(pet.id)} className="delete-button">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </Slider>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editingPet.name}
                onChange={handleFormChange}
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                value={editingPet.type}
                onChange={handleFormChange}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Fish</option>
              </select>
              <label htmlFor="breed">Breed:</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={editingPet.breed}
                onChange={handleFormChange}
              />
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={editingPet.color}
                onChange={handleFormChange}
              />
              <label htmlFor="sex">Sex:</label>
              <select
                id="sex"
                name="sex"
                value={editingPet.sex}
                onChange={handleFormChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label htmlFor="size">Size:</label>
              <select
                id="size"
                name="size"
                value={editingPet.size}
                onChange={handleFormChange}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={editingPet.age}
                onChange={handleFormChange}
              />
              <label htmlFor="image">Picture:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFormChange}
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={editingPet.description}
                onChange={handleFormChange}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
