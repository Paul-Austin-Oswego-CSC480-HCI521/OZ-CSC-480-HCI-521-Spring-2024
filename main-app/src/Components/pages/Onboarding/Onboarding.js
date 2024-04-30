import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import "./Onboarding.css";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    password: "",
    password2: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    contactPhone: "",
    about: "",
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const setForm = (data) => {
    setFormData({ ...formData, ...data });
  };

  const setErrors = (errors) => {
    // handle errors here
    console.log(errors);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            nextStep={nextStep}
            formData={formData}
            setForm={setForm}
            setErrors={setErrors}
            step={step}
            getProgressBarWidth={getProgressBarWidth}
          />
        );
      case 2:
        return (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setForm={setForm}
            step={step}
            getProgressBarWidth={getProgressBarWidth}
          />
        );
      case 3:
        return (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setForm={setForm}
            step={step}
            getProgressBarWidth={getProgressBarWidth}
          />
        );
      case 4:
        return <Step4 prevStep={prevStep} formData={formData} step={step} getProgressBarWidth={getProgressBarWidth}  />;
      default:
        return null;
    }
  };

  const getProgressBarWidth = () => {
    return `${(step - 1) * 33.33}%`; // Each step represents 33.33% of progress
  };
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
    <div className="onboarding-container">
      <div className="onboarding-hero-image"></div>
      <div className="signup-container">
      <div class="signup-back-button" onClick={(e) => e.preventDefault()}>
            <NavLink to="/shelter" className="signup-home-button"> 
              <svg class="arrow-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16L13.4 14.6L11.8 13H16V11H11.8L13.4 9.4L12 8L8 12L12 16ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#181207"/>
              </svg>
              <p>Back</p>
            </NavLink>
          </div> 
        <h2>Find your furr-ever friend <br/> today!</h2>
          <div className="signup-action-links">
            <NavLink to="/login" className="signup-links">Login</NavLink>
            <NavLink to="/signup" className="signup-links">Sign Up</NavLink>
          </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
