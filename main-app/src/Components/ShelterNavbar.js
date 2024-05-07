import React, { useState, useEffect } from "react";
import "./NavStyles.css";
import logo from "../Assets/PawsnClawsWords.svg";
import { NavLink as Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";

const ShelterNavbar = () => {
  const location = useLocation();

  const handleLinkClick = (path) => {
    // Check if the current page is the home page and the path includes an in-page link
    if (
      location.pathname === "/" &&
      (path === "/#how_it_works" || path === "/#FAQ")
    ) {
      const sectionId = path.substring(2); // Extracts 'how_it_works' or 'FAQ' from the path
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }
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
          <Link
            to="/"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <i>
              <IoPawSharp />
            </i>
            Adopt
          </Link>

          <Link
            to="shelter"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <i>
              <BsHouseHeartFill />
            </i>
            Shelter
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
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="signup"> Sign Up</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ShelterNavbar;
