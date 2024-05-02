import React, { useState, useEffect } from "react";
import "./NavStyles.css";
import { useCategory } from "./CategoryContext";
import logo from "../Assets/PawsnClawsWords.svg";
import { NavLink as Link } from "react-router-dom";
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";
import { getCookie } from "../Utils/CookieUtils";
import { useZipCode } from "./zipCodeContext";

const Navbar = () => {
  const { setSelectedCategory } = useCategory();
  const { zipCode, setZipCode } = useZipCode(); // Define zipCode state

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSubmitZipCode = (e) => {
    e.preventDefault();

    console.log("Hello World");
  };

  const handleLinkClick = (path) => {
    // Check if the current page is the home page and the path includes an in-page link
    if (path === "/#FAQ") {
      const sectionId = path.substring(2); // Extracts 'FAQ' from the path
      const section = document.getElementById(sectionId);
      if (section) {
        let offset = 0;
        // If it's the contact section, consider the height of the navbar
        const navbar = document.querySelector(".navbar");
        if (navbar) {
          offset = navbar.offsetHeight;
        }
        window.scrollTo({
          top: section.offsetTop - offset, // Subtract the height of the navbar
          behavior: "smooth",
        });
      }
    } else if (path === "/#contact") {
      const sectionId = path.substring(2); // Extracts 'contact' from the path
      const section = document.getElementById(sectionId);
      if (section) {
        let offset = 0;
        // If it's the contact section, consider the height of the navbar
        const navbar = document.querySelector(".navbar");
        if (navbar) {
          offset = navbar.offsetHeight;
        }
        window.scrollTo({
          top: section.offsetTop - offset, // Subtract the height of the navbar
          behavior: "smooth",
        });
      }
    }
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };
  //Track dropdown visibility state
  const [dropdownVisible, setDropdownVisible] = useState(false);

  //Show dropdown
  const showDropdown = () => setDropdownVisible(true);

  //Hide dropdown
  const hideDropdown = () => setDropdownVisible(false);

  //add/remove event listeners
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (dropdownVisible && !event.target.closest(".dropdown")) {
        hideDropdown();
      }
    };

    if (dropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dropdownVisible]);

  return (
    <>
      <div className="top-nav-container">
        <div className="top-nav">
          <Link to="/" className="active">
            <IoPawSharp /> Adopt
          </Link>
          {/* BELOW CHECKS IF SHELTER COOKIE IS SET, SENDING USER TO DASHBOARD IF LOGGED IN AND GENERIC SHELTER PAGE OTHERWISE */}
          {getCookie("shelterID") === "" ? (
            <Link to="/shelter">
              <BsHouseHeartFill /> Shelter
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <BsHouseHeartFill /> Shelter
            </Link>
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-logo ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-links ">
          <li className="dropdown">
            <button type="button" className="dropbtn" onClick={showDropdown}>
              Browse Pets ▼{" "}
            </button>
            {dropdownVisible && (
              <div className="dropdown-content">
                <Link
                  to="/ExplorePets"
                  onClick={() => handleSelectedCategory("Dog")}
                >
                  {" "}
                  Dogs
                </Link>
                <Link
                  to="/ExplorePets"
                  onClick={() => handleSelectedCategory("Cat")}
                >
                  {" "}
                  Cats
                </Link>
                <Link
                  to="/ExplorePets"
                  onClick={() => handleSelectedCategory("Bird")}
                >
                  {" "}
                  Birds
                </Link>
                <Link
                  to="/ExplorePets"
                  onClick={() => handleSelectedCategory("Small Critter")}
                >
                  {" "}
                  Small Critter
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link to="/FAQs" onClick={() => handleLinkClick("/FAQs")}>
              {" "}
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/about"> About Us</Link>
          </li>
          <li>
            <Link to="/#contact" onClick={() => handleLinkClick("/#contact")}>
              {" "}
              Contact Us
            </Link>
          </li>
          <li id="nav-zipcode-container">
            <form onSubmit={handleSubmitZipCode} className="zipcode-form">
              <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={handleZipCodeChange}
                className="zip-input"
              />
            </form>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
