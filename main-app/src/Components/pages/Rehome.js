import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import BannerBackground from "../../Assets/Cat Hero Banner.png";
import PersonIcon from "../../Assets/Icons/person.svg"; // Import the person icon SVG
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FAQs from "./AdoptionFAQ";
import "./Rehome.css"

export const RehomePage = () => {
  useEffect(() => {
    // Set body style when the component mounts
    // document.body.style.backgroundColor = "#EADBF7";
    document.body.style.backgroundColor = "#FFE5CC";

    // Clear body style when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div>
      <div
        className="rehome-banner-container"
        style={{ position: "relative", width: "100%" }}
      >
        <div
          className="rehome-bannerImage-container"
          style={{ position: "relative", width: "100%" }}
        >
          <img
            className="rehome-bannerDog"
            src={BannerBackground}
            alt=""
            style={{ width: "100%" }}
          />
          <div
            style={{
              color: "black",
              marginRight: "10px",
              position: "absolute",
              top: "35%",
              right: "5%",
              fontSize: "2rem",
              fontWeight: "900",
              fontFamily: "'Grandstander', cursive",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Grandstander', cursive",
              }}
            >
              Find a home for your furr-ever friend!
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              top: "60%",
              right: "20%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 30px",
                    color: "black",
                    border: "2px solid white",
                    borderRadius: "20px",
                    marginRight: "10px",
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <span style={{ marginRight: "5px" }}>Login</span>
                  <img
                    src={PersonIcon}
                    alt="Person"
                    style={{ width: "auto" }}
                  />
                </button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 30px",
                    color: "black",
                    border: "none",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.border = "2px solid white"; // Corrected line
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                  }}
                >
                  <span style={{ marginRight: "5px" }}>Sign-Up</span>
                  <img
                    src={PersonIcon}
                    alt="Person"
                    style={{ width: "auto" }}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FAQs />
    </div>
  );
};

export default RehomePage;
