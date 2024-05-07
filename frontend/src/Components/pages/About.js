import React from "react";
import "./About.css";
import { Helmet } from "react-helmet";

export const About = () => {   


    return (
        <div className="about-container" >
            
            {/*Our story and secondary image section on page*/}
            <div className="about-content-container">
                <div className="about-text-and-list">
                    <h1 className="about-h1">We Believe</h1>
                    <ul className="about-p">
                        <li>Passion is necessary when connecting loving homes and amazing animals in need</li>
                        <li>Adoption is about more than just finding a pet.</li>
                        <li>That this is essential for creating lifelong bonds and building a stronger community. </li>
                        <li>We can help you find your fur-ever friend.</li>
                    </ul>
                </div>
                <img 
                    src={`${process.env.PUBLIC_URL}/images/main_banner_2.jpg`} 
                    alt="Secondary Banner" 
                    className="about-second-image"  
                />
            </div>

            {/*/Mission statement*/}
            <div className="about-mission-statement" >
                <h1 className="about-h1">Our Mission</h1>
                <p className= "about-p">Our mission is to revolutionize 
                    pet adoption by creating a 
                    centralized hub for adoptable animals. 
                    By providing a user-friendly platform 
                    to list pets, manage profiles, and 
                    connect with adopters, we empower 
                    shelters to find loving homes for their 
                    animals more efficiently.
                    By offering a wider search pool 
                    for potential adopters and detailed 
                    profiles for each pet, we aim to 
                    significantly increase pet adoptions 
                    and reduce overcrowding in shelters.</p>
            </div>

                
            </div>

    );
};
