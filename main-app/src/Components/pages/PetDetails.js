import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import ShelterLogo from "../images/Shelterlogo.svg";
import "./PetDetails.css";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import hex from "../images/hex.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { items } from "./items";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet";

export const PetDetails = () => {
  let { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const petId = Number(id);
    const petDetails = items.find((item) => item.id === petId);
    setPet(petDetails);
    setLoading(false);
  }, [id]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading || !pet) {
    return (
      <div>
        <Navbar />
        Loading or pet not found...
      </div>
    );
  }

  <style>{(document.body.style.backgroundColor = "rgb(227, 234, 231)")}</style>;

  return (
    <div className="body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Paws N Claws/PetDetails</title>
        <link rel="canonical" href="http://moxie.cs.oswego.edu:48021" />
      </Helmet>
      <Navbar />

      <div className="page">
        <div className="top-page">
          <div className="left-side">
            <div>
              <button className="back-arrow" onClick={() => navigate(-1)}>
                <FiArrowLeft /> Back
              </button>
            </div>
            <div className="images-carousel">
              <Slider {...settings}>
                <div>
                  <img
                    src={pet.image}
                    alt="Jak Jax"
                    className="pet-images"
                  ></img>
                </div>
                <div>
                  <img src={hex} alt="Jak Jax" className="pet-images"></img>
                </div>
              </Slider>
            </div>
          </div>

          <div className="right-side">
            <div className="bubble-container">
              <div className="text-introduction">
                Hi, My name is {pet.name}!
              </div>
              <div className="text-pet-details">
                {pet.sex}, {pet.age}
              </div>
            </div>

            <div className="categories-container">
              <div className="text-category-type">{pet.category}</div>
              <div className="text-category-breed">{pet.breed}</div>
              <div className="text-category-distance">10.5 miles away</div>
            </div>

            <div className="pet-details-container">
              <div className="text-heading">My Story</div>
              <div className="text-pet-introduction">
                My name is {pet.name} and I am very cute.
              </div>
              <div className="text-facts">Facts About Me</div>
            </div>

            <div className="specifications-container">
              <div className="specifications1">
                <div className="name-title">
                  Name: <b>{pet.name}</b>
                </div>
                <div className="age-title">
                  Age: <b>{pet.age}</b>
                </div>
                <div className="age-title">
                  Color: <b>{pet.color}</b>
                </div>
                <div className="size-title">
                  Size: <b>{pet.size}</b>
                </div>
              </div>

              <div className="specifications2">
                <div className="temperament-title">
                  Temperament: <b>{pet.temperament}</b>
                </div>
                <div className="sex-title">
                  Sex: <b>{pet.sex}</b>
                </div>
                <div className="breed-title">
                  Breed: <b>{pet.breed}</b>
                </div>
                <div className="health-title">
                  Health: <b>Vaccinated</b>
                </div>
              </div>
            </div>

            <Link to="/userboard">
              <div className="shelter-box">
                <div className="left-alignment">
                  <div className="info-container">
                    <div className="shelter-info">
                      <img
                        loading="lazy"
                        srcSet={ShelterLogo}
                        className="shelter-logo"
                        alt=""
                      />
                      <div className="text-name-verification">
                        <div className="text-shelter-name">
                          Pulaski County Shelter
                        </div>
                        <i>
                          <IoIosCheckmarkCircle />
                        </i>
                      </div>
                    </div>
                    <div className="email-info">
                      <div className="text-email-title">Email:</div>
                      <div className="text-email">hello@pcs.com</div>
                    </div>
                    <div className="phone-info">
                      <div className="text-phone-title">Phone:</div>
                      <div className="text-phone">+1 (315) 766 9933</div>
                    </div>
                    <div className="address-info">
                      <div className="text-address-title">Address:</div>
                      <div className="text-address">
                        235 Adopt Me Ln, Somerset, KY 42501
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bottom-page">
          <div>
            <div className="carousel-heading"></div>

            <div className="about-meet-teamsss">
              <div className="see-more-button">
                <h1>Furr-Ever friends near you</h1>
                <Link to="/ExplorePets">
                  <button className="see-more-arrow">
                    See more
                    <FiArrowRight />{" "}
                  </button>
                </Link>
              </div>
              <div className="about-team-sections">
                <Slider variableWidth={true} {...settings}>
                  {[0, 3, 6].map((startIndex, groupIndex) => (
                    <div
                      className="work-section-info-container"
                      key={groupIndex}
                    >
                      {/* Map over each group of three items */}
                      {items
                        .slice(startIndex, startIndex + 5)
                        .map((item, index) => (
                          <a key={index} href={`/PetDetails/${item.id}`}>
                            <div className="work-section-info">
                              <div className="info-boxes-img-container">
                                <img
                                  src={item.image}
                                  alt=""
                                  style={{ maxWidth: "80%", height: "70%" }}
                                />
                              </div>
                              <h2>{item.name}</h2>
                              <p>{item.breed}</p>
                              <span>{item.age}</span>
                            </div>
                          </a>
                        ))}
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="accordian-container">
            <div className="dropdown1">
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    How do I know which pet is the right fit for me?
                    </AccordionSummary>
                    <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className="dropdown2">
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    What kind of pets can I adopt through Paws 'n Claws?
                    </AccordionSummary>
                    <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className="dropdown3">
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    What are the adoption fees and what do you cover?
                    </AccordionSummary>
                    <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className="dropdown4">
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    What is the adoption process like?
                    </AccordionSummary>
                    <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            </div>
        </div> */}
    </div>
  );
};
