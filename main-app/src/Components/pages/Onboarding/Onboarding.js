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
