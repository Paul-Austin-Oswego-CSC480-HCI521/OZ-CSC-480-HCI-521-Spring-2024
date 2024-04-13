import React from "react";
import BannerBackground from "../../Assets/Hero2.png";
import dogImage from "../../Assets/dog.png";
import catImage from "../../Assets/cat.png";
import birdImage from "../../Assets/bird.png";
import bunnyImage from "../../Assets/bunny.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Luke from "../../Assets/Furr-Ever friends near you_1.png";
import Finn from "../../Assets/Furr-Ever friends near you_2.png";
import Brownie from "../../Assets/Furr-Ever friends near you_3.png";
import Jaxon from "../../Assets/Purrrr - Cat friends near you_1.png";
import Chloe from "../../Assets/Purrrr - Cat friends near you_2.png";
import Asame from "../../Assets/Purrrr - Cat friends near you_4.png";
import Ginger from "../../Assets/Pet photo2.png";
import Rascal from "../../Assets/Pet photo.png";
import Danii from "../../Assets/Pet photo1.png";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Home.css";
import FAQs from "./AdoptionFAQ";
import Background from "../../Assets/BG pattern.png";
import { useState } from "react";

export const Home = () => {
  const [zipCode, setZipCode] = useState("13126"); // Define zipCode state

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSubmitZipCode = (e) => {
    e.preventDefault();

    console.log("Hello World");
  };

  const workInfoData = [
    {
      image: Luke,
      title: "Luke, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Finn,
      title: "Finn, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Brownie,
      title: "Brownie, F",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Jaxon,
      title: "Jaxon, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Danii,
      title: "Chloe, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Luke,
      title: "Asame, F",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Finn,
      title: "Ginger, F",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Jaxon,
      title: "Rascal, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Brownie,
      title: "Danii, F",
      text: "American Shorthair",
      age: "9-month old",
    },
  ];

  const workInfoDatas = [
    {
      image: Luke,
      title: "Luke, M",
      text: "American Shorthair",
      age: "9-month old",
    },

    {
      image: Jaxon,
      title: "Jaxon, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Chloe,
      title: "Chloe, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Rascal,
      title: "Asame, F",
      text: "American Shorthair",
      age: "9-month old",
    },

    {
      image: Ginger,
      title: "Rascal, M",
      text: "American Shorthair",
      age: "9-month old",
    },
    {
      image: Asame,
      title: "Chloe, M",
      text: "American Shorthair",
      age: "9-month old",
    },
  ];

  <style>{(document.body.style.backgroundColor = "#E3EAE7")}</style>;

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img className="home-bannerDog" src={BannerBackground} alt="" />
        </div>
        {/* Sejal's code */}
        <form onSubmit={handleSubmitZipCode} className="zip-form">
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={handleZipCodeChange}
            className="zip-input"
          />
          <button type="submit" className="zip-submit">
            {" "}
            Go!{" "}
          </button>
        </form>
        {/*  End of Sejal's Code*/}

        <div className="home-text-section">
          <div className="button-container">
            {/* Navigate to Multifilters page when this button is clicked */}
            <Link to="/ExplorePets" className="third-button">
              <img src={dogImage} alt="Dog" />
              <span>Dog</span>
            </Link>

            {/* Navigate to Multifilters page when this button is clicked */}
            <Link to="/ExplorePets" className="third-button">
              <img src={catImage} alt="Cat" />
              <span>Cat</span>
            </Link>

            {/* Navigate to Multifilters page when this button is clicked */}
            <Link to="/ExplorePets" className="third-button">
              <img src={birdImage} alt="Bird" />
              <span>Bird</span>
            </Link>

            {/* Navigate to Multifilters page when this button is clicked */}
            <Link to="/ExplorePets" className="fifth-button">
              <img src={bunnyImage} alt="Small Critters" />
              Small Critters
            </Link>
          </div>
          <h1 className="primary-heading">Find your furr-ever friend today!</h1>
        </div>
      </div>

      <div className="about-meet-teamss">
        <h1>Furr-Ever friends near you</h1>
        <div className="about-team-sections">
          <Slider>
            {[0, 3, 6].map((startIndex, groupIndex) => (
              <div className="work-section-info-container" key={groupIndex}>
                {/* Map over each group of three items */}
                {workInfoData
                  .slice(startIndex, startIndex + 5)
                  .map((data, index) => (
                    <a key={index} href={`/PetDetails`}>
                      <div className="work-section-info">
                        <div className="info-boxes-img-container">
                          <img
                            src={data.image}
                            alt=""
                            style={{ maxWidth: "80%", height: "auto" }}
                          />
                        </div>
                        <h2>{data.title}</h2>
                        <p>{data.text}</p>
                        <span>{data.age}</span>
                      </div>
                    </a>
                  ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="about-meet-teamss">
        <h1>Purr-Cat friends near you</h1>
        <div className="about-team-sections">
          <Slider>
            {[0, 3, 6].map((startIndex, groupIndex) => (
              <div className="work-section-info-container" key={groupIndex}>
                {/* Map over each group of three items */}
                {workInfoDatas
                  .slice(startIndex, startIndex + 5)
                  .map((data, index) => (
                    <div className="work-section-info" key={index}>
                      <div className="info-boxes-img-container">
                        <img
                          src={data.image}
                          alt=""
                          style={{ maxWidth: "80%", height: "auto" }}
                        />
                      </div>
                      <h2>{data.title}</h2>
                      <p>{data.text}</p>
                      <span>{data.age} </span>
                    </div>
                  ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <FAQs />
    </div>
  );
};