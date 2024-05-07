import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BannerBackground from "../../Assets/Cat Hero Banner.png";
import PersonIcon from "../../Assets/Icons/dashboard.svg"; // Import the person icon SVG
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Rehome.css";
import { Helmet } from "react-helmet";

export const RehomePageViewDashboard = () => {
  useEffect(() => {
    // Set body style when the component mounts
    // document.body.style.backgroundColor = "#EADBF7";
    document.body.style.backgroundColor = "rgb(227, 234, 231)";

    // Clear body style when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Paws N Claws - shelter</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
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
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
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
                  <span style={{ marginRight: "5px" }}>View Dashboard</span>
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
      {/* <FAQs /> */}
    </div>
  );
};

export default RehomePageViewDashboard;
