import React from "react";
import "./About.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";

export const About = () => {
  return (
    <div className="about-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
      {/*Our story and secondary image section on page*/}
      <div className="about-content-container">
        <div className="about-text-and-list">
          <h1>Our Story</h1>
          <ul className="about-info-list">
            <li>
              <b>Founded with Love:</b> Began as a small dream driven by a
              passion for animals.
            </li>
            <li>
              <b>Roots:</b> Established in the heart of our local community,
              earning trust and recognition.
            </li>
            <li>
              <b>Growth:</b> Evolved from a modest start into a trusted name in
              pet care.
            </li>
            <li>
              <b>Team of Passionate People:</b> Comprised of devoted pet lovers
              and experts in various fields.
            </li>
            <li>
              <b>A Family of Pet Advocates:</b> United by a shared mission to
              make a positive impact on pets and their families.
            </li>
          </ul>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/main_banner_2.jpg`}
          alt="Secondary Banner"
          className="about-second-image"
        />
      </div>

      {/*/Mission statement*/}
      <div className="about-mission-statement">
        <h1>Our Mission</h1>
        <p>
          At Furrytale, our mission is to bring a splash of joy and
          companionship into every home through our dedicated service and
          passion for animals. We believe in creating strong bonds between pets
          and their families by providing top-tier care and an array of services
          tailored to meet the unique needs of every furry friend. Our
          commitment to excellence and love for animals drives us to constantly
          innovate and improve, ensuring that every pet enjoys a happy, healthy,
          and fulfilling life
        </p>
      </div>
    </div>
  );
};
