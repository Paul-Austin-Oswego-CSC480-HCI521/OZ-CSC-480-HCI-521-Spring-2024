import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import "./PetDetails.css";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { items } from "./items";
import { useNavigate } from "react-router";
import { useZipCode } from "../zipCodeContext";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet";

export const PetDetails = () => {
  let { id } = useParams();
  const [pet, setPet] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { zipCode } = useZipCode();

  useEffect(() => {
    // perform this check to show hardcoded pets like before for GUI people to continue to be able to test
    if (!isNaN(id)) {
      const petId = Number(id);
      const petDetails = items.find((item) => item.id === petId);
      setPet(petDetails);
      setLoading(false);
    } else {
      fetchPetData();
    }
  }, [id]);

  const fetchPetData = async () => {
    const petId = id;

    const petResponse = await fetch(
      process.env.REACT_APP_OPEN_LIBERTY_ROOT +
        "database-controller/api/pet/" +
        petId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(newPet),
      }
    );

    if (petResponse.ok) {
      const petDetails = await petResponse.json();
      console.log(petDetails);
      setPet(petDetails);

      const shelterResponse = await fetch(
        process.env.REACT_APP_OPEN_LIBERTY_ROOT +
          "database-controller/api/shelter/" +
          petDetails.currentShelterId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(newPet),
        }
      );

      if (shelterResponse.ok) {
        const shelterDetails = await shelterResponse.json();
        setShelter(shelterDetails);
        console.log(shelterDetails);
        setLoading(false);
      }
    }

    // const petDetails = items.find((item) => item.id === petId);
    // setPet(petDetails);
    // setLoading(false);
  };

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

  const testZipCode = zipCode;

  async function getCoords(zipcode) {
    const accessToken =
      "pk.eyJ1IjoiaGpyb3NlMjkiLCJhIjoiY2x1MGFmbzNmMDJxYTJrbnAyY3J6MWN1NiJ9.T_K7aTjSSiqtAIeRbL5Msw";
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      zipcode +
      ".json?access_token=" +
      accessToken;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const latitude = data.features[0].geometry.coordinates[1];
      const longitude = data.features[0].geometry.coordinates[0];
      const coords = [latitude, longitude];
      return coords;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  function coordsDistance(coords, coords2) {
    const lat1Rad = toRadians(coords[0]);
    const lon1Rad = toRadians(coords[1]);
    const lat2Rad = toRadians(coords2[0]);
    const lon2Rad = toRadians(coords2[1]);

    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;

    const a =
      Math.pow(Math.sin(latDiff / 2), 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.pow(Math.sin(lonDiff / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = 3963 * c;

    return d;
  }

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  async function generateHTML() {
    try {
      const testCoords = await getCoords(testZipCode);
      const shelterCoords = await getCoords("13126");
      const distance = coordsDistance(testCoords, shelterCoords);
      const distanceElement = document.getElementById("distance");
      distanceElement.textContent = `Distance: ${distance.toFixed(2)} miles`;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  generateHTML();

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
                {isNaN(id) ? (
                  pet.images.map((img, idx) => (
                    <div>
                      <img
                        key={idx}
                        src={img}
                        alt={"A pet named " + pet.name}
                      ></img>
                    </div>
                  ))
                ) : (
                  <div>
                    <img
                      src={pet.image}
                      alt="Jak Jax"
                      className="pet-images"
                    ></img>
                  </div>
                )}

                {/* <img src={pet.image} alt="Jak Jax" className="pet-images"></img> */}
                {/* <div>
                  <img src={hex} alt="Jak Jax" className="pet-images"></img>
                </div> */}
              </Slider>
            </div>
          </div>

          <div className="right-side">
            <div className="bubble-container">
              <div className="text-introduction">
                Hi, My name is {pet.name}!
              </div>
              <div className="text-pet-details">
                {pet.sex != null ? pet.sex + "," : ""}{" "}
                {pet.age != null ? pet.age : 0} years old
              </div>
            </div>

            <div className="categories-container">
              <div className="text-category-type">{pet.type}</div>
              <div className="text-category-breed">{pet.breed}</div>

              <div className="text-category-distance">
                <body>
                  <div id="distance"></div>
                  <script src="your_script.js"></script>
                </body>
              </div>
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

            {shelter != null ? (
              <Link to={"/userboard/" + shelter.id}>
                {shelter != null ? (
                  <div className="shelter-box">
                    <div className="left-alignment">
                      <div className="info-container">
                        <div className="shelter-info">
                          <img
                            loading="lazy"
                            srcSet={shelter.image}
                            className="shelter-logo"
                            alt=""
                          />
                          <div className="text-name-verification">
                            <div className="text-shelter-name">
                              {shelter.name}{" "}
                              <i>
                                <IoIosCheckmarkCircle />
                              </i>
                            </div>
                          </div>
                        </div>
                        <div className="email-info">
                          <div className="text-email-title">Email:</div>
                          <div className="text-email">
                            {shelter.emailAddress}
                          </div>
                        </div>
                        <div className="phone-info">
                          <div className="text-phone-title">Phone:</div>
                          <div className="text-phone">
                            {shelter.phoneNumber}
                          </div>
                        </div>
                        <div className="address-info">
                          <div className="text-address-title">Address:</div>
                          {/* this should probably check that the field actually exists and only do a <br> is it exists. see above for example if needed using ternary operators */}
                          <div className="text-address">
                            {shelter.location.addressLine1} <br />
                            {shelter.location.addressLine2} <br />{" "}
                            {shelter.location.city} <br />
                            {shelter.location.state}
                            <br /> {shelter.location.zipCode}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* this one didn't work for me so i did it below but didn't remove this one */}
                  </div>
                ) : (
                  "Associated shelter not found :("
                )}
              </Link>
            ) : (
              "Associated shelter not found :("
            )}
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
