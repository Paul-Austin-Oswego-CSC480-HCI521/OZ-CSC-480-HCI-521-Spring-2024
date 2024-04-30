import React from "react";
import "./About.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";

export const About = () => {   


    const teams = [
        {
        name: "Engine Team",
        members: [
            {
                name: "Rick",
                image: `${process.env.PUBLIC_URL}/teams/Engine/engine_1.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Morty",
                image: `${process.env.PUBLIC_URL}/teams/Engine/engine_2.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Beth",
                image: `${process.env.PUBLIC_URL}/teams/Engine/engine_3.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Summer",
                image: `${process.env.PUBLIC_URL}/teams/Engine/engine_4.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Noob Noob",
                image: `${process.env.PUBLIC_URL}/teams/Engine/engine_5.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Jerry",
                image: `${process.env.PUBLIC_URL}/teams/Engine/engine_6.jpg`,
                info: "...To Be Added"
            }
            ]
        },
        {
        name: "GUI Team",
        members: [
            {
                name: "Benson",
                image: `${process.env.PUBLIC_URL}/teams/Gui/gui_1.png`,
                info: "...To Be Added"
            },
            {
                name: "Mordecai",
                image: `${process.env.PUBLIC_URL}/teams/Gui/gui_2.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Muscle Man",
                image: `${process.env.PUBLIC_URL}/teams/Gui/gui_3.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Pops",
                image: `${process.env.PUBLIC_URL}/teams/Gui/gui_4.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Rigby",
                image: `${process.env.PUBLIC_URL}/teams/Gui/gui_5.png`,
                info: "...To Be Added"
            },
            {
                name: "Skips",
                image: `${process.env.PUBLIC_URL}/teams/Gui/gui_6.jpg`,
                info: "...To Be Added"
            }
            // ... member objects
            ]
        },
        {
            name: "Quality Assurance Team",
            members: [
            {
                name: "Marcelline",
                image: `${process.env.PUBLIC_URL}/teams/Qa/qa_1.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Finn",
                image: `${process.env.PUBLIC_URL}/teams/Qa/qa_2.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Jake",
                image: `${process.env.PUBLIC_URL}/teams/Qa/qa_3.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Ice King",
                image: `${process.env.PUBLIC_URL}/teams/Qa/qa_4.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Lemongrab",
                image: `${process.env.PUBLIC_URL}/teams/Qa/qa_5.jpg`,
                info: "...To Be Added"
            },
            {
                name: "BMO",
                image: `${process.env.PUBLIC_URL}/teams/Qa/qa_6.jpg`,
                info: "...To Be Added"
            }
            // ... member objects
            ]
        },
        {
            name: "Requirements Team",
            members: [
            {
                name: "Steven",
                image: `${process.env.PUBLIC_URL}/teams/Requirements/requirements_1.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Connie",
                image: `${process.env.PUBLIC_URL}/teams/Requirements/requirements_2.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Garnet",
                image: `${process.env.PUBLIC_URL}/teams/Requirements/requirements_3.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Mr.Universe",
                image: `${process.env.PUBLIC_URL}/teams/Requirements/requirements_4.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Lapis Lazuli",
                image: `${process.env.PUBLIC_URL}/teams/Requirements/requirements_5.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Pearl",
                image: `${process.env.PUBLIC_URL}/teams/Requirements/requirements_6.jpg`,
                info: "...To Be Added"
            }
            // ... member objects
            ]
        },
        {
            name: "Usability Team",
            members: [
            {
                name: "Gumball",
                image: `${process.env.PUBLIC_URL}/teams/Usability/usability_1.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Darwin",
                image: `${process.env.PUBLIC_URL}/teams/Usability/usability_2.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Anais",
                image: `${process.env.PUBLIC_URL}/teams/Usability/usability_3.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Tobias",
                image: `${process.env.PUBLIC_URL}/teams/Usability/usability_4.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Penny",
                image: `${process.env.PUBLIC_URL}/teams/Usability/usability_5.jpg`,
                info: "...To Be Added"
            },
            {
                name: "Larry",
                image: `${process.env.PUBLIC_URL}/teams/Usability/usability_6.jpg`,
                info: "...To Be Added"
            }
            // ... member objects
            ]
        }
        
    ];

    /*Carousel Settings */
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
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };



    return (
        <div className="about-container" >
            
            {/*Our story and secondary image section on page*/}
            <div className="about-content-container">
                <div className="about-text-and-list">
                    <h1 className="about-h1">Our Story</h1>
                    <ul className="about-info-list">
                        <li><b>Founded with Love:</b> Began as a small dream driven by a passion for animals.</li>
                        <li><b>Roots:</b> Established in the heart of our local community, earning trust and recognition.</li>
                        <li><b>Growth:</b> Evolved from a modest start into a trusted name in pet care.</li>
                        <li><b>Team of Passionate People:</b> Comprised of devoted pet lovers and experts in various fields.</li>
                        <li><b>A Family of Pet Advocates:</b> United by a shared mission to make a positive impact on pets and their families.</li>
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
                <p>At Furrytale, our mission is to bring a
                    splash of joy and companionship into
                    every home through our dedicated service
                    and passion for animals. We believe in
                        creating strong bonds between pets and
                        their families by providing top-tier
                        care and an array of services tailored
                        to meet the unique needs of every furry
                            friend. Our commitment to excellence and
                            love for animals drives us to constantly
                            innovate and improve, ensuring that every
                            pet enjoys a happy, healthy, and fulfilling
                                life</p>
            </div>
            
            {/*/Meet the team carousel section*/}
            <div className="about-meet-teams">
            <h1> Meet The Teams</h1>

                {teams.map((team, index) => (
                    <div key={index} className="about-team-section">
                        <h2>{team.name}</h2>
                        <Slider {...sliderSettings}>
                        {team.members.map((member, memberIndex) => (
                            <div key={memberIndex} className="about-team-member">
                            <img src={member.image} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p>{member.info}</p>
                            </div>
                        ))}
                        </Slider>
                    </div>
                ))}
                
            </div>

        </div>
    );
};
