import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import ResponsiveCarousel from "../ResponsiveCarousel";
import Jax from "../images/Jax.jpeg";
import Lucy from "../images/lucy4.jpg";
import Hex from "../images/hex.jpg";
import Luke from "../images/luke.jpg";
import './PetDetails.css';
import { useState } from "react";


export const PetDetails = () => {

    const data = [
        {
         statement: 'Adoption Process',
         answer: '' ,
        }
       ]

    const pets = [
        { image: Jax, name: 'Jax' },
        { image: Lucy, name: 'Lucy' },
        { image: Hex, name: 'Hex' },
        { image: Luke, name: 'Luke' },
        // Add more pets as needed
    ];

const [selected, setSelected] = useState(null)

    const toggle = (i) => {
        if (selected === i ) {
            return setSelected(null)
    } 
    setSelected(i)
}


    return (
        <div>
            <div className="displayImages">
                <img src={Jax} alt="Jak Jax"></img>

            <div className="heading-one">
                Hello, My name is Jax! 
            </div>
            <div className="details">
                Male, 1 year old
            </div>

            <div className="heading-two">
                My Story... 
            </div>

            <div className="details2">
            I was born...
            </div>

            <div className="heading-three">
                Facts About Me
            </div>

            <div className="details3">
            Breed, health info, etc
            </div>

            <div className="heading-four">
                Similar Pets
            </div>

            <div className="wrapper">
                <div className="accordian">
                {data.map((item,i) => (
                    <div className="item">
                        < div className="title" onClick={() => toggle(i)}>
                            <h2>{item.statement}</h2>
                            <span>{selected === i ? "-" : "+" } </span>
                        </div>
                        <div className={selected === i ? "content show" : "content" }> 
                        {item.answer}
                        </div>
                    </div>
                ))}

                </div>
            </div>

            <div>
        <button className="back-arrow">
        <FiArrowLeft />{" "}
          </button>
        </div>
            </div>
            
            <ResponsiveCarousel items={pets} />
        </div>
        
    )
}