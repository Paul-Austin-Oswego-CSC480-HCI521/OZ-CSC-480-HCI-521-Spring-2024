import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import petImg1 from "../Images/lucy4.jpg";
import petImg2 from "../Images/B1C42F45-5655-44F2-8389-5A1A16AC7ED2.jpg";
import petImg3 from "../Images/IMG_1956.jpg";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>

        <button className="home-pet-img1">
          <img src={petImg1} alt="" />
        </button>

        <button className="home-pet-img2">
          <img src={petImg2} alt="" />
        </button>

        <button className="home-pet-img3">
          <img src={petImg3} alt="" />
        </button>

        <div className="home-text-section">
          <h1 className="primary-heading">
            Name:
          </h1>
          <p className="primary-text">
            Shelter name
          </p>
          <h1 className="primary-heading2">
            Location:
          </h1>
          <p className="primary-text2">
            Shelter location
          </p>

          <h1 className="primary-heading3">
            Contact Info:
          </h1>
          <p className="primary-text3">
            Shelter contact information
          </p>

          <button className="primary-text4">
            Listed Pets
          </button>


          <div>
            
          <button className="secondary-button">
            Edit Profile <FiArrowRight />{" "}
          </button>
          </div>
          <div>
          <button className="secondary-button2">
            Add Pet <FiArrowRight />{" "}
          </button>
          </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;