import React, { useState } from "react";
import "./AdoptionFAQ.css";
import { Helmet } from "react-helmet";

const AdoptionFAQ = () => {
  // State to keep track of which question is currently open
  const [openQuestion, setOpenQuestion] = useState(null);

  // Function to toggle the open/close state of a question
  const toggleQuestion = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  // Array of FAQ items with questions and answers
  const faqItems = [
    {
      question: "What are the requirements for adopting a pet?",
      answer:
        "Each shelter that lists its pets on PawsNClaws has its own rules and requirements for adopting pets. If you’re interested in a specific pet, please reach out to the shelter that created the pet listing to find out what their policies are. This is in addition to any requirements given by New York State [hyperlink to adoption process page].",
    },
    {
      question: "How can I adopt a pet listed on PawsNClaws?",
      answer:
        "PawsNClaws acts as a centralized hub where you can see pets listed for adoption by a multitude of adoption agencies. While PawsNClaws provides a web-based adoption platform, we act only as a middleman serving to connect adopters to shelters. When you complete an adoption application for a pet, it is sent to the shelter housing the pet. It is then the shelter’s job to process the documentation and decide based on their own policies whether you are a good fit for the pet.",
    },
    {
      question: "Am I applying to PawsNClaws?",
      answer:
        "No. Once you’ve submitted an inquiry to an adoption agency, the shelter or rescue group with the pet you’re interested in will be sent your information. It is then up to the shelter or rescue group to determine whether it’s a match.",
    },
    {
      question: "How will I know If I've been approved to adopt a pet?",
      answer:
        "After submitting an adoption inquiry, the shelter or rescue group with the pet you’re interested in will contact you. You may also reach out to the shelter or rescue group directly to follow up.",
    },
    {
      question:
        "I’m not sure if I want to adopt a pet, can I meet them before I decide?",
      answer:
        "Yes, you can! On each pet's information page, there is a button located at [insert location] that will allow you to schedule a visit with the shelter housing the pet.",
    },
    {
      question: "How do I search for a pet?",
      answer:
        "To find pets available for adoption, you can begin your search by clicking on the “Browse Pets” button located on our homepage. Since our site is updated regularly, we recommend checking back frequently to see any changes to available pets.",
    },
    {
      question: "How often is PawsNClaws updated?",
      answer:
        "Since each shelter is responsible for updating information for their own pet listings, our site is constantly updating.",
    },
  ];

  const faqItem = [
    {
      question: "How can I adopt a pet from your shelter?",
      answer:
        "Adopting a pet is easy! Simply browse through our available pets, choose the one that steals your heart, and fill out our adoption application. Our adoption counselors will guide you through the rest of the process.",
    },
    {
      question: "What are the adoption fees?",
      answer:
        "Adoption fees vary based on the type of pet and their age. These fees typically cover vaccinations, spaying/neutering, microchipping, and other essential medical procedures. Rest assured, every penny goes towards the well-being of our animals.",
    },
    {
      question: "Can I meet the pet before adopting?",
      answer:
        "Absolutely! We encourage meet-and-greet sessions with your potential new companion. This allows you to interact, bond, and ensure that it's a perfect match for both you and the pet.",
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className="adoption-faq" id="FAQ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>FAQs</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
      <h1>Adoption FAQ</h1>
      <p>
        Find answers to commonly asked questions about the pet adoption process,
        pet care and support.
      </p>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${openQuestion === index ? "open" : ""}`}
              onClick={() => toggleQuestion(index)}
            >
              {item.question}
              <span className="toggle-icon">&#x25BC;</span>
            </div>
            {openQuestion === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionFAQ;
