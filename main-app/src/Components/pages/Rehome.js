import React from "react";
import { Link } from "react-router-dom";
import BannerBackground from "../../Assets/Cat Hero Banner.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FAQs from "./AdoptionFAQ";

export const RehomePage = () => {
  return (
    <div className="rehome-container">
      <div className="rehome-banner-container" style={{ position: "relative" }}>
        <div className="rehome-bannerImage-container">
          <img className="rehome-bannerDog" src={BannerBackground} alt="" />
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
            }}
          >
            Find a home for your furr-ever friend!
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "20%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <Link to="/login">
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#fe9e0d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#fe9e0d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Signup
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
