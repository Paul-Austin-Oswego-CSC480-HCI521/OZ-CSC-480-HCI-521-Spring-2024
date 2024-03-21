import React from "react";
import ResponsiveCarousel from "../ResponsiveCarousel";
import './petDetails.css';
import jax from "../images/jax.png"


export const PetDetails = () => {

    const pets = [
        { image: jax, name: 'Pet Name 1' },
        { image: jax, name: 'Pet Name 2' },
        { image: jax, name: 'Pet Name 3' },
        { image: jax, name: 'Pet Name 4' },
        // Add more pets as needed
    ];

    return (
        <div>
            <div className="profile-container">
                <div className="profile-container-images">
                    <img src={jax} alt="Pet"></img>
                    <img src={jax} alt="Pet"></img>
                </div>
                <div className="profile-details">
                    <div className="profile-header">
                        <h2>Hi, My name is Jaxon!!</h2>
                        <p>Male, Brat age</p>
                    </div>
                    <div className="profile-section">
                        <h3>About me</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div> 
                    <div className="profile-section">
                        <h3>More about me</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                </div>
            </div>
            <ResponsiveCarousel items={pets} />
        
        </div>
        
    )
}