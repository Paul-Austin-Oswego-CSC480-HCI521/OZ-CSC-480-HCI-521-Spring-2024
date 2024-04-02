import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  // Set background color when component renders
  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFE5CC";

    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Get form data
      const formData = new FormData(event.target);

      // Create JSON object
      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      //   Send JSON object to backend
      fetch("YOUR_BACKEND_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      })
        .then((response = 200) => {
          if (response.ok) {
            //   if (1) {
            // Redirect to another component upon successful login
            navigate("/dashboard");
          } else {
            // Handle unsuccessful login
            setLoginError(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error cases
          setLoginError(true);
        });
    };

    document
      .getElementById("loginForm")
      .addEventListener("submit", handleSubmit);

    return () => {
      // Clean up effect
      document.body.style.backgroundColor = null;
      document
        .getElementById("loginForm")
        .removeEventListener("submit", handleSubmit);
    };
  }, [navigate]);

  return (
    <div
      className="x-container"
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "80vh",
        padding: "0.5%",
        marginTop: "20px",
        color: "black",
      }}
    >
      <div
        className="hero-image"
        style={{
          position: "relative",
          backgroundImage:
            "url('https://source.unsplash.com/random?dog,cat,pets')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50%",
          height: "100%",
          borderRadius: "8px",
        }}
        alt="Hero Image"
      ></div>
      <div
        className="login-container"
        style={{
          //   backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "50%",
          marginRight: "20px",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          //   padding: "2%",
        }}
      >
        <h2
          style={{
            padding: "3%",
          }}
        >
          User Login
        </h2>
        {loginError && (
          <p style={{ color: "red" }}>
            Invalid username or password. Please try again.
          </p>
        )}
        <form
          action="login"
          method="post"
          className="login-form"
          id="loginForm"
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            htmlFor="username"
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            style={{
              padding: "10px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <br />

          <label
            htmlFor="password"
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Password:
          </label>

          <input
            type="password"
            name="password"
            id="password"
            required
            style={{
              padding: "10px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <br />

          <input
            type="submit"
            id="submitBtn"
            value="Submit"
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: "none",
              margin: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              backgroundColor: "#4caf50",
              color: "#fff",
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
