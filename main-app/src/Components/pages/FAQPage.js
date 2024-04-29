import React, { useEffect } from "react";
import FAQs from "./AdoptionFAQ"; 

const YourComponent = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#E3EAE7";
  }, []);

  return (

      <FAQs />

  );
};

export default FAQs;
