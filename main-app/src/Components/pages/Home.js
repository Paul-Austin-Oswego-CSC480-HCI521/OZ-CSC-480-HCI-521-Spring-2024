import React, { useEffect } from "react";
import { useCategory } from "../CategoryContext";
import BannerBackground from "../../Assets/Hero2.png";
import dogImage from "../../Assets/dog.png";
import catImage from "../../Assets/cat.png";
import birdImage from "../../Assets/bird.png";
import bunnyImage from "../../Assets/bunny.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Home.css";
import { items } from "./items";
import { Helmet } from "react-helmet";

export const Home = () => {
  const { setSelectedCategory } = useCategory();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  <style>{(document.body.style.backgroundColor = "#E3EAE7")}</style>;
  useEffect(() => {
    // Set body style when the component mounts
    document.body.style.backgroundColor = "#E3EAE7";

    // Clear body style when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="home-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Paws N Claws - Adopt</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img className="home-bannerDog" src={BannerBackground} alt="" />
        </div>

        <div className="home-text-section">
          <div className="button-container">
            {/* Navigate to Multifilters page when this button is clicked */}
            <Link
              to="/ExplorePets"
              onClick={() => handleSelectedCategory("Dog")}
              className="third-button"
            >
              <img src={dogImage} alt="Dog" />
              <span>Dog</span>
            </Link>

            {/* Navigate to Multifilters page when this button is clicked */}
            <Link
              to="/ExplorePets"
              onClick={() => handleSelectedCategory("Cat")}
              className="third-button"
            >
              <img src={catImage} alt="Cat" />
              <span>Cat</span>
            </Link>

            {/* Navigate to Multifilters page when this button is clicked */}
            <Link
              to="/ExplorePets"
              onClick={() => handleSelectedCategory("Bird")}
              className="third-button"
            >
              <img src={birdImage} alt="Bird" />
              <span>Bird</span>
            </Link>

            {/* Navigate to Multifilters page when this button is clicked */}
            <Link
              to="/ExplorePets"
              onClick={() => handleSelectedCategory("Other")}
              className="fifth-button"
            >
              <img src={bunnyImage} alt="Other" />
              Other
            </Link>
          </div>
          <h1 className="primary-heading">Find your furr-ever friend today!</h1>
        </div>
      </div>

      <div className="about-meet-teamss">
        <h1>Furr-Ever friends near you</h1>
        <div className="about-team-sections">
          <Slider variableWidth={true} {...settings}>
            {[0, 3, 6].map((startIndex, groupIndex) => (
              <div className="work-section-info-container" key={groupIndex}>
                {/* Map over each group of three items */}
                {items.slice(startIndex, startIndex + 5).map((item, index) => (
                  <a key={index} href={`/PetDetails/${item.id}`}>
                    <div className="work-section-info">
                      <div className="info-boxes-img-container">
                        <img
                          src={item.image}
                          alt=""
                          style={{ maxWidth: "80%", height: "70%" }}
                        />
                      </div>
                      <h2>{item.name}</h2>
                      <p>{item.breed}</p>
                      <span>{item.age}</span>
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* <FAQs /> */}
    </div>
  );
};
