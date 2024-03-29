import React, { useState, useEffect } from "react";
import './NavStyles.css'; 
import logo from '../logo.svg';
import {NavLink as Link} from "react-router-dom";

const Navbar = () => {

    //Track dropdown visibility state
    const [dropdownVisible, setDropdownVisible] = useState(false);

    //Show dropdown  
    const showDropdown = () => setDropdownVisible(true);

    //Hide dropdown  
    const hideDropdown = () => setDropdownVisible(false);

    //add/remove event listeners
    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (dropdownVisible && !event.target.closest('.dropdown')){
                hideDropdown();
            }
        };

        if (dropdownVisible){
            document.addEventListener('click', handleDocumentClick);
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [dropdownVisible]);

    return(
        <>
        <div className="top-nav">
            <Link to="adopt"> Adopt</Link>
            <Link to="rehome"> Rehome</Link>
        </div>

        <nav className="navbar">    
            <div className="logo ">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                
            </div>
            <ul className="nav-links ">
                <li className="dropdown">
                    <button type="button" className="dropbtn" onClick={showDropdown}>Browse Pets </button>
                    {dropdownVisible && (
                        <div className="dropdown-content">
                        <Link to="PetDetails"> Dogs</Link>
                        <Link to=""> Cats</Link>
                        <Link to=""> Birds</Link>
                        <Link to=""> Other Pets</Link>
                    </div>
                    )}
                </li>   
                <li><Link to="aboutus"> About Us</Link></li>
                <li><Link to="contactus"> Contact Us</Link></li>
                <li><Link to="donate"> Donate </Link></li>
                <li><Link to="howitworks"> How It Works</Link></li>
            </ul>     
        </nav>

        </>
    );
};

export default Navbar;