import React from "react";
import AboutBackground from "../Assets/about-background.png";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container"> 
      </div>
    </div>
  );
};

export default About;