import React from "react";
import BannerBackground from "../../Assets/Hero2.png";
import dogImage from '../../Assets/dog.png';
import catImage from '../../Assets/cat.png';
import birdImage from '../../Assets/bird.png';
import bunnyImage from '../../Assets/bunny.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Luke from "../../Assets/Furr-Ever friends near you_1.png";
import Finn from "../../Assets/Furr-Ever friends near you_2.png";
import Brownie from "../../Assets/Furr-Ever friends near you_3.png";
import Jaxon from "../../Assets/Purrrr - Cat friends near you_1.png";
import Chloe from "../../Assets/Furr-Ever friends near you_5.png";
import Asame from "../../Assets/Screenshot2023.png";
import Ginger from "../../Assets/Screenshot2029.jpg";
import Rascal from "../../Assets/Screenshot2011.jpg";
import Danii from "../../Assets/Screenshot2013.JPG";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Home.css";
// import FAQs from './AdoptionFAQ';

export const Home = () => {
  const scrollToHowItWorks = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const howItWorksSection = document.getElementById("how_it_works"); // Get the section element

    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const teams = [
    {
    name: "",
    members: [
        {
            name: "Smoothie, M",
            image: Luke,
            info: "American Shorthair"
        },
        {
            name: "Watson, M",
            image: Finn,
            info: "American Shorthair"
        },
        {
            name: "Victor, M",
            image: Brownie,
            info: "American Shorthair"
        },
        {
            name: "Aofie, F",
            image: Jaxon,
            info: "American Shorthair"
        },
        {
            name: "Smoothie F",
            image: Chloe,
            info: "American Shorthair"
        },
        {
            name: "Jerry",
            image: Chloe,
            info: "American Shorthair"
        },
        {
          name: "Jerry",
          image: Ginger,
          info: "American Shorthair"
      },
      {
        name: "Jerry",
        image: Rascal,
        info: "American Shorthair"
    },
    {
      name: "Jerry",
      image: Danii,
      info: "American Shorthair"
  }
        ]
    },

    {
      name: "Purrrr - Cat friends near you",
      members: [
          {
              name: "Benson",
              image: Finn,
              info: "...To Be Added"
          },
          {
              name: "Mordecai",
              image: Asame,
              info: "...To Be Added"
          },
          {
              name: "Muscle Man",
              image: Ginger ,
              info: "...To Be Added"
          },
          {
              name: "Pops",
              image:Finn,
              info: "...To Be Added"
          },
          {
              name: "Rigby",
              image: Asame,
              info: "...To Be Added"
          },
          {
              name: "Skips",
              image:Finn ,
              info: "...To Be Added"
          }
          // ... member objects
          ]
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

  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
        }
    },
    {
        breakpoint: 600,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        }
    }
    ]
};
  <style>{(document.body.style.backgroundColor = "#E3EAE7")}</style>;

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img className="home-bannerDog" src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
        <div className="button-container">
  {/* Navigate to Multifilters page when this button is clicked */}
  <Link to="/multi-filters" className="third-button">
  <img src={dogImage} alt="Dog" />
  <span>Dog</span>
</Link>

  {/* Navigate to Multifilters page when this button is clicked */}
  <Link to="/multi-filters" className="third-button">
  <img src={catImage} alt="Cat" />
  <span>Cat</span>
</Link>

  {/* Navigate to Multifilters page when this button is clicked */}
  <Link to="/multi-filters" className="third-button">
  <img src={birdImage} alt="Bird" />
  <span>Bird</span>
</Link>

  {/* Navigate to Multifilters page when this button is clicked */}
  <Link to="/multi-filters" className="fifth-button">
  <img src={bunnyImage} alt="Small Critters" />
    Small Critters
  </Link>
</div>
    <h1 className="primary-heading">
            Find your furr-ever friend today!
          </h1>
        </div> 
      </div>

<div className="about-meet-teamss">
    <h1>Furr-Ever friends near you</h1>
    {teams.map((team, index) => (
        <div key={index} className="about-team-sections">
            <h2>{team.name}</h2>
            <Slider {...sliderSettings}>
                {team.members.map((member, memberIndex) => (
                    <div key={memberIndex} className="about-team-members">
                        <img src={member.image} alt={member.name} />
                        <h3>{member.name}</h3>
                        <p>{member.info}</p>
                    </div>
                ))}
            </Slider>
        </div>
    ))}
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
      {/* <FAQs /> */}
      <div className="contact-page-wrapper">
        <h1 className="primary-headingg">Have Question In Mind</h1>
        <h1 className="primary-headingg">Let Us Help You</h1>
        <button className="secondary-buttonn">Contact Us</button>
      </div>
    </div>
  );
};
