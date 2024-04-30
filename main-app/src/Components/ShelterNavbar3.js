import React from "react";
import logo from "../Assets/PawsnClawsWords.svg";
import { Link } from "react-router-dom";
import PersonIcon from "../Assets/Icons/dashboard.svg"; // Import the person icon SVG
import { IoPawSharp } from "react-icons/io5";
import { BsHouseHeartFill } from "react-icons/bs";

const ShelterNavbar3 = () => {
  return (
    <>
      <div className="top-nav-container">
        <div className="top-nav">
          <Link to="/">
            <IoPawSharp /> Adopt
          </Link>
          <Link to="/viewdash" className='active'>
            <BsHouseHeartFill /> Shelter
          </Link>
        </div>
      </div>

      <nav style={{ backgroundColor: "", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "40px", border: "2px solid white", padding: "10px" }}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", padding: "15px 30px", color: "black", border: "none", borderRadius: "20px", backgroundColor: "orange", fontWeight: "bold", transition: "background-color 0.3s" }} onMouseEnter={(e) => { e.target.style.backgroundColor = "rgba(255, 165, 0, 0.8)"; e.target.style.border = "2px solid white"; }} onMouseLeave={(e) => { e.target.style.backgroundColor = "orange"; }}>
            <span style={{ marginRight: "5px" }}>View Dashboard</span>
            <img src={PersonIcon} alt="Person" style={{ width: "auto" }} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default ShelterNavbar3;
