import React, { useEffect } from "react";
import FAQs from "./AdoptionFAQ";
import { Helmet } from "react-helmet";

const YourComponent = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#E3EAE7";
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FAQ</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
      <FAQs />
    </div>
  );
};

export default FAQs;
