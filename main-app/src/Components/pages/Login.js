import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from '../../Assets/purple_paw_Logo.svg';
import "./Login.css"

function Login() {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();


  // Set background color when component renders
  React.useEffect(() => {
    document.body.style.backgroundColor = "rgb(227, 234, 231)";
    // document.body.style.backgroundColor = "#EADBF7";

    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Get form data
      const formData = new FormData(event.target);
      const email = formData.get("emailAddress");

      // Create JSON object
      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      console.log(jsonObject);
      // console.log("public url" + process.env.REACT_APP_OPEN_LIBERTY_ROOT)

      //   Send JSON object to backend
      fetch(
        process.env.REACT_APP_OPEN_LIBERTY_ROOT + "database-controller/api/shelter/login?" +
        new URLSearchParams(jsonObject),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonObject),
        }
      )
        .then(async (response) => {
          if (response.ok) {
            const responseJson = await response.json();
            const cookieJsonKeys = Object.entries(responseJson)

            for (const entry of cookieJsonKeys) {
              const suffix = "path=/;";
              document.cookie = entry[0] + "=" + entry[1] + ";" + suffix;
            };

            console.log(document.cookie);

            // // Extract both the JWT and the Shelter ID from the Response
            // const jwt = responseText.substring(0, responseText.indexOf(":"));
            // const shelter_id = responseText.substring(responseText.indexOf(":") + 1);

            // // Calculate the expiration date of the JWT
            // const expirationDate = new Date();
            // expirationDate.setDate(expirationDate.getDate() + 1);

            // // Create three cookies: One that represents the current user logged in, one that represents the current user's JWT, and one that represents the current user's ID
            // document.cookie = "currentUser=" + email + "; expires=" + expirationDate + "; path=/";
            // document.cookie = email + "JWT=" + jwt + "; expires=" + expirationDate + "; path=/";
            // document.cookie = email + "ID=" + shelter_id + "; expires=" + expirationDate + "; path=/";

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

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", handleSubmit);
    }

    return () => {
      // Clean up effect
      document.body.style.backgroundColor = null;
      if (loginForm) {
        loginForm.removeEventListener("submit", handleSubmit);
      }
    };
  }, [navigate]);


  return (
    <div className="container">
      <div className="hero-image" alt="Hero Image"></div>
      <div className="login-container">

        {/* <div class="back-button" onClick={(e) => e.preventDefault()}>
            <a href="#">
              <svg class="arrow-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16L13.4 14.6L11.8 13H16V11H11.8L13.4 9.4L12 8L8 12L12 16ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#181207"/>
              </svg>
              <p>Back</p>
            </a>
          </div> */}

        <div class="logo">
          <Logo className="purple-logo" width="150" height="150" />
        </div>

        <h1> Find your furr-ever friend <br /> today! </h1>

        <div className="login-action-links">
          <NavLink to="/login" className="login-links" activeClassName="active">Login</NavLink>
          <NavLink to="/signup" className="login-links" activeClassName="active">Sign Up</NavLink>
        </div>

        <div class="invalid-error">
          {loginError && (
            <p style={{ color: "red" }}>
              <b> Invalid email address or password. Please try again.</b>
            </p>
          )}
        </div>

        <form action="login" method="post" className="login-form" id="loginForm">
          <label htmlFor="emailAddress"></label>
          <input type="text" name="emailAddress" id="emailAddress" placeholder="Email Address" required />


          <label htmlFor="password"></label>
          <input type="password" name="password" id="password" placeholder="Password" required />

          <br />

          <button type="submit" id="submitBtn" class="login-button">
            Login
            <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="currentColor" />
            </svg>
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
