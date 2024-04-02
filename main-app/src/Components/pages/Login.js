import React from "react";

function Login() {
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

      // Send JSON object to backend (Replace '??' with the correct endpoint)
      fetch("YOUR_BACKEND_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle response from backend
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    document.getElementById("loginForm").addEventListener("submit", handleSubmit);

    return () => {
      // Clean up effect
      document.body.style.backgroundColor = null;
      document.getElementById("loginForm").removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        className="hero-image"
        style={{
          backgroundImage: "url('https://source.unsplash.com/random?dog,cat,pets')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50%",
          height: "100vh",
          borderRadius: "8px",
        }}
        alt="Hero Image"
      ></div>
      <div className="login-container" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "50%", marginRight: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2>User Login</h2>
        <form action="login" method="post" className="login-form" id="loginForm">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" required /><br />

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required /><br />

          <input type="submit" id="submitBtn" value="Submit" style={{ padding: "10px 20px", marginBottom: "16px", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s", backgroundColor: "#4caf50", color: "#fff" }} />
        </form>
      </div>
    </div>
  );
}

export default Login;
