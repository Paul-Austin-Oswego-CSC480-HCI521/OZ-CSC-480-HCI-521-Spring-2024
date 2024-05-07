import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar"; // Import Navbar component
import { FiArrowRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PickMeals from "../Assets/Screenshot2028.jpg";
import ChooseMeals from "../Assets/Screenshot2014.jpg";
import DeliveryMeals from "../Assets/Screenshot2015.jpg";
import PickDogs from "../Assets/Screenshot2016.jpg";
import PickCats from "../Assets/Screenshot2022.jpg";
import PickDoggs from "../Assets/Screenshot2023.png";
import PickDogss from "../Assets/Screenshot2029.jpg";
import PickCatss from "../Assets/Screenshot2011.jpg";
import PickCatsss from "../Assets/Screenshot2013.JPG";
import Slider from "react-slick";
import { FaDog } from "react-icons/fa6";
import { FaCat } from "react-icons/fa";
import { PiBirdFill } from "react-icons/pi";
import { GiRabbit } from "react-icons/gi";

const Home = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "LUKE",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et",
    },
    {
      image: ChooseMeals,
      title: "FINN",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: DeliveryMeals,
      title: "BROWNIE",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
      image: PickDogs,
      title: "JAXON",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: PickCats,
      title: "CHLOE",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: PickCatss,
      title: "ASAME",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
    {
      image: PickCatsss,
      title: "GINGER",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: PickDogss,
      title: "RASCAL",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: PickDoggs,
      title: "DANII",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="home-container">
      <button className="primary-button moved-button">Adopt</button>
      <button className="primary-button adopt-button">Rehome</button>
       <Navbar /> {/* Use Navbar component */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Find your furr-ever friend today!
          </h1>
          <p className="primary-text">
            
          </p>
          <button className="secondary-button">
            How It Works <FiArrowRight />{" "}
          </button>
        
          <div className="button-container">
      <button className="third-button"> <FaDog /> <span>Dog</span></button>
      <button className="fourth-button"><FaCat />Cats </button>
      <button className="fifth-button"> <PiBirdFill />Birds </button>
      <button className="fifth-button"><GiRabbit />Small Critters </button>
    </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <div className="work-section-top">
        <p className="primary-subheading">Furry Friend For You</p>
      </div>    
  <Slider {...settings}>
    {[0, 3, 6].map((startIndex, groupIndex) => (
      <div className="work-section-info-container" key={groupIndex}>
        {/* Map over each group of three items */}
        {workInfoData.slice(startIndex, startIndex + 3).map((data, index) => (
          <div className="work-section-info" key={index}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" style={{ maxWidth: "80%", height: "auto" }} />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    ))}
  </Slider>
    </div>
  );
};

export default Home;
