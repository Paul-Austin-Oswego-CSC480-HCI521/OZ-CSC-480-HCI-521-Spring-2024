import React, { useState, useEffect } from "react";
import "./NavStyles.css";
import logo from "../Assets/PawsnClawsWords.svg";
import { NavLink as Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();

  const [zipCode, setZipCode] = useState("13126"); // Define zipCode state

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSubmitZipCode = (e) => {
    e.preventDefault();

    console.log("Hello World");
  };

  const handleLinkClick = (path) => {
    // Check if the current page is the home page and the path includes an in-page link
    if (location.pathname === "/" && path === "/#FAQ") {
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
            <IoPawSharp /> Adopt
          </Link>
          <Link
            to="/shelter"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <BsHouseHeartFill /> Shelter
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
              Browse Pets ▼{" "}
            </button>
            {dropdownVisible && (
              <div className="dropdown-content">
                <Link to="/ExplorePets"> Dogs</Link>
                <Link to="/ExplorePets"> Cats</Link>
                <Link to="/ExplorePets"> Birds</Link>
                <Link to="/ExplorePets"> Other Pets</Link>
              </div>
            )}
          </li>
          <li>
            <Link to="/#FAQ" onClick={() => handleLinkClick("/#FAQ")}>
              {" "}
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/about"> About Us</Link>
          </li>
          <li>
            <Link to="/"> Contact Us</Link>
          </li>
          <li></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
