import React, { useState } from 'react';
import './AdoptionFAQ.css';

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
      question: 'How can I adopt a pet from your shelter?',
      answer:
        'Adopting a pet is easy! Simply browse through our available pets, choose the one that steals your heart, and fill out our adoption application. Our adoption counselors will guide you through the rest of the process.',
    },
    {
      question: 'What are the adoption fees?',
      answer:
        'Adoption fees vary based on the type of pet and their age. These fees typically cover vaccinations, spaying/neutering, microchipping, and other essential medical procedures. Rest assured, every penny goes towards the well-being of our animals.',
    },
    {
      question: 'Can I meet the pet before adopting?',
      answer:
        'Absolutely! We encourage meet-and-greet sessions with your potential new companion. This allows you to interact, bond, and ensure that it\'s a perfect match for both you and the pet.',
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className="adoption-faq">
      <h1>Adoption FAQ</h1>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${openQuestion === index ? 'open' : ''}`}
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