import React from "react";
import { Link } from "react-router-dom";

function RehomePage() {
  // Set background color when component renders
  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFE5CC";
    return () => {
      // Clean up effect
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        width: "100%",
        height: "80vh",
        margin: "2%",
      }}
      className="rehome-container"
    >
      <div
        className="rehome-hero-image"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/random?dog,cat,pets')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50%",
          borderRadius: "8px",
          margin: "10", // Center the image horizontally
        }}
        alt="Hero Image"
      ></div>
      <div
        className="login-container"
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          //   flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%"
        }}
      >
        <Link to="/login">
          <button
            className="login-button"
            style={{
              padding: "20px 40px",
              borderRadius: "40px",
              border: "none",
              backgroundColor: "#4caf50",
              color: "#fff",
              cursor: "pointer",
              margin: "20px",
            }}
          >
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button
            className="signup-button"
            style={{
              padding: "20px 40px",
              borderRadius: "40px",
              border: "none",
              backgroundColor: "#2196F3",
              color: "#fff",
              cursor: "pointer",
              margin: "20px",
            }}
          >
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RehomePage;
