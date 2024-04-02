import React from "react";
// import { Link } from "react-router-dom";

function Dashboard() {
  // Set background color when component renders
  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFE5CC";
    return () => {
      // Clean up effect
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <h1>Login successful - THIS SHOULD BE SHELTER DASHBOARD (Implementation in progress...)</h1>
  );
}

export default Dashboard;
