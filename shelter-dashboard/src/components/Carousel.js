import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './Carousel.css';

const Carousel = ({ pets }) => {
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

  return (
    <div className="carousel">
      {pets && pets.length > 0 ? (
        <Slider {...settings}>
          {pets.map((pet, index) => (
            <div key={index} className="carousel-item">
              <img src={pet.image} alt={pet.name} className="carousel-image" />
              <div className="carousel-item-content">
                <h4>{pet.name}</h4>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No pets available for adoption.</p>
      )}
    </div>
  );
};

export default Carousel;
