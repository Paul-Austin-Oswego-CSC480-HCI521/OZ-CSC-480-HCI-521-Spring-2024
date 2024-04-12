import React, { useState, useEffect } from "react";
import "./DashNavStyles.css";
import logo from "../Assets/PawsnClawsWords.svg";
import { NavLink as Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

const ShelterDashNavbar = () => {
  const location = useLocation();

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
        <div className="logo ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-links ">
          <li className="dropdown">
            <button type="button" className="dropbtn" onClick={showDropdown}>
              {<CgProfile />}
              {<GiHamburgerMenu />}
            </button>
            {dropdownVisible && (
              <div className="dropdown-content">
                <Link to="/dashboard"> View Dashboard</Link>
                <Link to="/ExplorePets"> Edit Profile</Link>
                <Link to="/ExplorePets"> Log Out</Link>
                <Link to="/ExplorePets"> Delete My Account</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ShelterDashNavbar;
