import React from 'react';
import Navbar1 from "./Navbar1"; // Import Navbar component
import { Link } from 'react-router-dom';



function RehomePage() {
  <style>
    {document.body.style.backgroundColor = '#FFE5CC'}
  </style>
  return (    
    <div className="rehome-container">
      <Link to="/"> <button className="primary-buttons moved-button">Adopt</button></Link>
      <button className="primary-button adopts-button">Rehome</button>
       <Navbar1 />
      <h1>This is the Rehome Page</h1>
      <p>This page intentionally left blank.</p>
    </div>
  );
}

export default RehomePage;