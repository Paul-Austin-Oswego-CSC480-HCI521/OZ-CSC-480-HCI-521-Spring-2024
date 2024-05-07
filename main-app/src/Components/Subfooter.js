import React from "react";
import "./Subfooter.css";
import { NavLink as Link } from "react-router-dom";

const Subfooter = () => {
  return (
    <div>
      <hr />
      <div className="subfooter-wrapper">
        <div className="subfooter-section-one">
          <div className="footer-section-columns">
            <span>©2024 PawsNClaws</span>
          </div>
        </div>
        <div className="subfooter-section-two">
          <div className="footer-section-columns">
            <span>
              <Link to="/about">About</Link>
            </span>
          </div>
          <div className="footer-section-columns">
            <span>How it works</span>
          </div>
          <div className="footer-section-columns">
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subfooter;
