import React from "react";
import "./NavStyles.css";
import logo from "../Assets/PawsnClawsWords.svg";
import { NavLink as Link, useLocation } from "react-router-dom";
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";

const ShelterNavbar2 = () => {
  const location = useLocation();

  const handleLinkClick = (path) => {
    if (path === "/#FAQ" || path === "/#contact") {
      const sectionId = path.substring(2); // Extracts 'FAQ' from the path
      const section = document.getElementById(sectionId);
      if (section) {
        let offset = 0;
        if (path === "/#contact") {
          // If it's the contact section, consider the height of the navbar
          const navbar = document.querySelector(".navbar");
          if (navbar) {
            offset = navbar.offsetHeight;
          }
        }
        window.scrollTo({
          top: section.offsetTop - offset, // Subtract the height of the navbar
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <div className="top-nav-container">
        <div className="top-nav">
          <Link
            to="/"
            
          >
            <IoPawSharp /> Adopt
          </Link>
          <Link
            to="/shelter"
            className='active'
          >
            <BsHouseHeartFill /> Shelter
          </Link>
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-logo ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-links ">
          <li>
            <Link to="/shelter/FAQs" onClick={() => handleLinkClick("/FAQs")}>
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/about"> About Us</Link>
          </li>
          <li>
            <Link
              to="/shelter#contact"
              onClick={() => handleLinkClick("/#contact")}
            >
              Contact Us
            </Link>
          </li>
          <li></li>
        </ul>
      </nav>
    </>
  );
};

export default ShelterNavbar2;
