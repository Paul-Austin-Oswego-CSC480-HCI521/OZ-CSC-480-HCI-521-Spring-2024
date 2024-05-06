import React, { useEffect } from "react";
import BannerBackground from "../../Assets/Cat Hero Banner.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Rehome.css";
import { Helmet } from "react-helmet";

export const RehomePage = () => {
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
        <title>Paws N Claws - Shelter</title>
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
          </div>
        </div>
      </div>
      {/* <FAQs /> */}
    </div>
  );
};

export default RehomePage;
