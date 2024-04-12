import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import Jax from "../images/Jax.jpeg";
import Lucy from "../images/lucy4.jpg";
import Hex from "../images/hex.jpg";
import ShelterLogo from "../images/Shelterlogo.svg";
import Watson from "../images/Jax.jpeg";
import Bubble from "../images/speechbubble.png";
import "./PetDetails.css";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Luke from "../../Assets/Furr-Ever friends near you_1.png";
import Finn from "../../Assets/Furr-Ever friends near you_2.png";
import Brownie from "../../Assets/Furr-Ever friends near you_3.png";
import Jaxon from "../../Assets/Purrrr - Cat friends near you_1.png";
import Chloe from "../../Assets/Furr-Ever friends near you_5.png";
import Asame from "../../Assets/Screenshot2023.png";
import Ginger from "../../Assets/Screenshot2029.jpg";
import Rascal from "../../Assets/Screenshot2011.jpg";
import Danii from "../../Assets/Screenshot2013.JPG";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { items } from "./items";
import Navbar from "../Navbar";

export const PetDetails = () => {
  let { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const petId = Number(id);
    const petDetails = items.find((item) => item.id === petId);
    setPet(petDetails);
    setLoading(false);
  }, [id]);

  const pets = [
    { image: Jax, name: "Jax" },
    { image: Lucy, name: "Lucy" },
    { image: Hex, name: "Hex" },
    { image: Luke, name: "Luke" },
    { image: Watson, name: "Watson" },
    // Add more pets as needed
  ];
  const teams = [
    {
      name: "",
      members: [
        {
          name: "Smoothie, M",
          image: Luke,
          info: "American Shorthair",
        },
        {
          name: "Watson, M",
          image: Finn,
          info: "American Shorthair",
        },
        {
          name: "Victor, M",
          image: Brownie,
          info: "American Shorthair",
        },
        {
          name: "Aofie, F",
          image: Jaxon,
          info: "American Shorthair",
        },
        {
          name: "Smoothie F",
          image: Chloe,
          info: "American Shorthair",
        },
        {
          name: "Jerry",
          image: Chloe,
          info: "American Shorthair",
        },
        {
          name: "Jerry",
          image: Ginger,
          info: "American Shorthair",
        },
        {
          name: "Jerry",
          image: Rascal,
          info: "American Shorthair",
        },
        {
          name: "Jerry",
          image: Danii,
          info: "American Shorthair",
        },
      ],
    },
  ];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
    return <div>Loading or pet not found...</div>;
  }
  <style>{(document.body.style.backgroundColor = "#ebdcf7")}</style>;
  return (
    <div className="body">
      <Navbar />
      <div className="displayImages">
        <img src={pet.image} alt="Jak Jax" className="pet-image"></img>
      </div>

      <div className="bubble-container">
        <div className="bubble-text-container"></div>

        {/* <img src={Bubble} alt=""></img> */}
      </div>

      <div className="categories-container">
        <div className="type-of-pet">{pet.category}</div>

        <div className="breed-type">{pet.breed}</div>

        <div className="distance">10.5 miles away</div>
      </div>

      <div className="introduction">Hello, My name is {pet.name}!</div>

      <div className="pet-details">
        {pet.sex}, {pet.age}
      </div>

      <div className="pet-type">{pet.category}</div>

      <div className="pet-details-container">
        <div className="heading-two">My Story</div>

        <div className="details2">
          My name is {pet.name} and I am very cute.
        </div>

        <div className="heading-three">Fun Facts About Me</div>

        <div className="details-container">
          <div className="name-title">Name: {pet.name}</div>

          <div className="age-title">Age: {pet.age}</div>

          <div className="color-title">Color: {pet.color}</div>

          <div className="type-title">Type: {pet.category}</div>
        </div>

        <div className="details-container2">
          <div className="sex-title">Sex: {pet.sex}</div>

          <div className="breed-title">Breed: {pet.breed}</div>

          <div className="health-title">Health: Vaccinated</div>
        </div>
      </div>

      <div className="div">
        <div className="div-2">
          <div className="column-2">
            <div className="div-5">
              <div className="div-6">
                <img loading="lazy" srcSet={ShelterLogo} className="img-2" />
                <div className="div-7">
                  <div className="div-8">Pulaski County Shelter</div>
                  <i>
                    <IoIosCheckmarkCircle />
                  </i>
                </div>
              </div>
              <div className="div-9">
                <div className="div-10">Email:</div>
                <div className="div-11">hello@pcs.com</div>
              </div>
              <div className="div-12">
                <div className="div-13">Phone:</div>
                <div className="div-14">+1 (315) 766 9933</div>
              </div>
              <div className="div-15">
                <div className="div-16">Address:</div>
                <div className="div-17">
                  235 Adopt Me Ln, Somerset, KY 42501
                </div>
              </div>
              <div className="div-18">
                <div className="div-19">Hours:</div>
                <div className="div-20">
                  Mon
                  <br />
                  Tues
                  <br />
                  Wed
                  <br />
                  Thurs
                  <br />
                  Fri
                  <br />
                  Sat
                  <br />
                  Sun
                </div>
                <div className="div-21">
                  12–6 PM
                  <br />
                  12–6 PM
                  <br />
                  12-6 PM
                  <br />
                  12–6 PM
                  <br />
                  12–6 PM
                  <br />
                  Closed
                  <br />
                  Closed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Link to="/ExplorePets">
          <button className="back-arrow">
            <FiArrowLeft />{" "}
          </button>
        </Link>
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

      <div className="pet-about-meet-teamss">
        <h1>Furr-Ever friends near you</h1>
        {teams.map((team, index) => (
          <div key={index} className="pet-about-team-sections">
            <h2>{team.name}</h2>
            <Slider {...sliderSettings}>
              {team.members.map((member, memberIndex) => (
                <div className="pet-work-section-info">
                  <div key={memberIndex} className="pet-about-team-members">
                    <img src={member.image} alt={member.name} />
                    <h3>{member.name}</h3>
                    <p>{member.info}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </div>
  );
};
