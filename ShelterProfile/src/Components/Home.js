import React from "react";
import petImg1 from "../Images/lucy4.jpg";
import petImg2 from "../Images/B1C42F45-5655-44F2-8389-5A1A16AC7ED2.jpg";
import petImg3 from "../Images/IMG_1956.jpg";
import profileBg from "../Images/profilebg.png";
import profilepic from "../Images/shelterpic.png";
import { FiArrowLeft, FiArrowRight, FiArrowUp } from "react-icons/fi";

const Home = () => {
  return (
    <div className="pet-details-container">
      
      <div className="pet-details-inner-container">

      <div className="profile-container">
        <img src={profileBg} alt="" />

      </div>

      <div className="profile-img">
        <img src={profilepic} alt="" />
      </div>

        <button className="home-pet-img1">
          <img src={petImg1} alt="" />
          <h2>
          Lucy
          </h2>
          Female, 15 years
          <div>
          Breed
          </div>
          
          
        </button>

        <button className="home-pet-img2">
          <img src={petImg2} alt="" />
          <h2>
          Smoothie
          </h2>
          Male, 9 months
          <div>
          American Shorthair
          </div>

        </button>

        <button className="home-pet-img3">
          <img src={petImg3} alt="" />
          <h2>
          Danii
          </h2>
          Female, 9 months
          <div>
          American Shorthair
          </div>

        </button>

        <div className="home-text-section">
          <p className="primary-text">
            Shelter name
          </p>
    
          <p className="primary-text2">
            Oswego, NY
          </p>

        
          <p className="primary-text3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </p>

          <div className="primary-text4">
            <h1>
            All Pets
            </h1>
           
          </div>


          <div>
            
          <button className="secondary-button">
          Upload Pet 
          </button>
          </div>
          <div>
          <button className="secondary-button2">
            Edit Profile
          </button>
          </div>
        </div>
        <div>
        
        </div>
      </div>
    </div>
  );
};

export default Home;