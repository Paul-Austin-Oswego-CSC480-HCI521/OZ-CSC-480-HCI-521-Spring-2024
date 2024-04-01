import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./Carousel.css"
import { Link } from 'react-router-dom';

const ResponsiveCarousel = ({ items }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <Carousel responsive={responsive}>
            {items.map((item, index) => (
                <div className="petImages" key={index} style={{ padding: 10, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                    <img src={item.image} alt={`Item ${index}`} style={{ width: '100%', height: '45%' }} />
                    <Link to="/PetDetails"><p style={{ textAlign: 'center' }}>{item.name}</p></Link>
                </div>
            ))}
        </Carousel>
    );
};

export default ResponsiveCarousel;