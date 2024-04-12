import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import Jax from "../images/Jax.jpeg";
import Luke from "../../Assets/Furr-Ever friends near you_1.png";
import Finn from "../../Assets/Furr-Ever friends near you_2.png";
import Brownie from "../../Assets/Furr-Ever friends near you_3.png";
import Jaxon from "../../Assets/Purrrr - Cat friends near you_1.png";
import Chloe from "../../Assets/Furr-Ever friends near you_5.png";
import Asame from "../../Assets/Screenshot2023.png";
import Ginger from "../../Assets/Screenshot2029.jpg";
import Rascal from "../../Assets/Screenshot2011.jpg";
import Danii from "../../Assets/Screenshot2013.JPG";
import "./PetDetails.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
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
    console.log("Pet ID:", id);
    console.log("Pet Details:", petDetails);
    setPet(petDetails);
    setLoading(false);
  }, [id]);

  const data = [
    {
      statement: "Adoption Process",
      answer: "",
    },
  ];

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

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

  const pets = [
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

  if (loading || !pet) {
    return <div>Loading or pet not found...</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="displayImages">
        <img src={pet.image} alt="Jak Jax"></img>

        <div className="heading-one">Hello, My name is {pet.name}</div>
        <div className="details">Male, {pet.age} </div>

        <div className="heading-two">My Story...</div>

        <div className="details2">I was born...</div>

        <div className="heading-three">Facts About Me</div>

        <div className="details3">Breed, health info, etc</div>

        <div className="wrapper">
          <div className="accordian">
            {data.map((item, i) => (
              <div className="item">
                <div className="title" onClick={() => toggle(i)}>
                  <h2>{item.statement}</h2>
                  <span>{selected === i ? "-" : "+"} </span>
                </div>
                <div className={selected === i ? "content show" : "content"}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Link to="/ExplorePets">
            <button className="back-arrow">
              <FiArrowLeft />{" "}
            </button>
          </Link>
        </div>
      </div>

      <div className="about-meet-teamss">
        <h1>Furr-Ever friends near you</h1>
        {pets.map((pets, index) => (
          <div key={index} className="about-team-sections">
            <h2>{pets.name}</h2>
            <Slider {...sliderSettings}>
              {pets.members.map((member, memberIndex) => (
                <Link to="/PetDetails/:d">
                  <div key={memberIndex} className="about-team-members">
                    <img src={member.image} alt={member.name} />
                    <h3>{member.name}</h3>
                    <p>{member.info}</p>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </div>
  );
};
