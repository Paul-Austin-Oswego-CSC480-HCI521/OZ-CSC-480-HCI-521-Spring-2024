import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png"
import BannerImage from "../../Assets/home-banner-image.png"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import Luke from "../../Assets/Screenshot2028.jpg"
import Finn from "../../Assets/Screenshot2014.jpg"
import Brownie from "../../Assets/Screenshot2015.jpg";
import Jaxon from "../../Assets/Screenshot2016.jpg";
import Chloe from "../../Assets/Screenshot2022.jpg";
import Asame from "../../Assets/Screenshot2023.png";
import Ginger from "../../Assets/Screenshot2029.jpg";
import Rascal from "../../Assets/Screenshot2011.jpg";
import Danii from "../../Assets/Screenshot2013.JPG";
import Slider from "react-slick";
import { FaDog } from "react-icons/fa6";
import { FaCat } from "react-icons/fa";
import { PiBirdFill } from "react-icons/pi";
import { GiRabbit } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {

    const scrollToHowItWorks = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        const howItWorksSection = document.getElementById('how_it_works'); // Get the section element
    
        if (howItWorksSection) {
          howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      const workInfoData = [
        {
          image: Luke,
          title: "LUKE",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et",
        },
        {
          image: Finn,
          title: "FINN",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
        },
        {
          image: Brownie,
          title: "BROWNIE",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
        },
        {
          image: Jaxon,
          title: "JAXON",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        },
        {
          image: Chloe,
          title: "CHLOE",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
        },
        {
          image: Asame,
          title: "ASAME",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
        },
        {
          image: Ginger,
          title: "GINGER",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        },
        {
          image: Rascal,
          title: "RASCAL",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
        },
        {
          image: Danii,
          title: "DANII",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
        },
      ];

      

      const workInfoDatas = [
        {
          title: "Browse Pets",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        },
        {
          title: "Apply For Adoption",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
        },
        {
          title: "Meet Your Match",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
        },
        {
          title: "Finalize Adoption",
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
    <style>
      {document.body.style.backgroundColor = '#D2E5F6'}
    </style>
    
    return(
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="Banner Background" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Find Your Furr-Ever Friend Today
                    </h1>
                    <p className="primary-text">

                    </p>
                    <button className="secondary-button" id="how_it_works_button" onClick={scrollToHowItWorks}>
                        How It Works <FiArrowRight />
                    </button>
                    <div className="button-container">
                        <Link to="/ExplorePets" className="third-button">
                            <FaDog />
                            <span>Dog</span>
                        </Link>
                        <Link to="ExplorePets" className="fourth-button">
                            <FaCat />
                            <span>Cat</span>
                        </Link>
                        <Link to="/ExplorePets" className="fifth-button">
                            <PiBirdFill />
                            Birds
                        </Link>
                        <Link to="/ExplorePets" className="fifth-buton">
                            <GiRabbit />
                            Small Critters
                        </Link>
                    </div>
                </div>
                <div className="home-image-section">
                    <img src={BannerImage} alt="Cute Cat" />
                </div>
            </div>
            <div className="work-section-top">
                <p className="primary-subheading">
                    Furry Friend For You
                </p>
            </div>
            <Slider {...settings}>
                {[0, 3, 6].map((startIndex, groupIndex) => (
                    <div className="work-section-info-container" key={groupIndex}>
                        {workInfoData.slice(startIndex,startIndex + 3).map((data, index) => 
                        <div className="work-section-info" key={index}>
                            <div className="info-boxes-img-container">
                                <img src={data.image} alt="" style={{maxWidth:'80%', height:'auto'}} />
                            </div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                        </div>)}
                    </div>
                ))}
            </Slider>
            <div className="work-section-wrapper">
                <div className="work-section-top">
                    <h1 className="primary-headings" id="how_it_works">
                        How It Works
                    </h1>
                </div>
                <div className="work-section-bottom">
                    {workInfoDatas.map((data) =>(
                        <div className="work-section-infos" key={data.title}>
                            <div className="info-boxes-img-container">
                                <img src={data.image} alt=""/>
                            </div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="adoption-faq-container" id="FAQ">
                <h1>Adoption FAQ</h1>
                <div className="faq-item">
                    <h2>Question 1</h2>
                    <p>Answer</p>
                </div>
                <div className="faq-item">
                    <h2>Question 2?</h2>
                    <p>Answer to question 2.</p>
                </div>
                <div className="faq-item">
                    <h2>Question 3?</h2>
                    <p>Answer to question 3.</p>
                </div>
            </div>
            <div className="contact-page-wrapper">
                <h1 className="primary-headingg">Have Question In Mind</h1>
                <h1 className="primary-headingg">Let Us Help You</h1>
                <button className="secondary-buttonn">Contact Us</button>
            </div>
        </div>
    )
}