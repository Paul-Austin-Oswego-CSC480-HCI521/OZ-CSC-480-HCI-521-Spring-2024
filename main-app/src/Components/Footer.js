import React from "react";
import "./Footer.css";
import Favicon from "../Assets/Favicon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <Link to="/">
            <img src={Favicon} alt="" />
          </Link>
        </div>

        {/* <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div> */}
      </div>

      <div className="footer-section-two">
        <div className="footer-section-columns">
          <a href="mailto:hello@pawsnclaws.com">
            <email>hello@pawsnclaws.com</email>
          </a>
          <div className="footer-section-columns">
            <span>©2024 PawsNClaws</span>
          </div>
        </div>
        {/* <div className="footer-section-columns">
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>

          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>000-000-0000</span>
          <span>pet@food.com</span>
          <span>pets@food.com</span>
          <span>contact@donate.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
