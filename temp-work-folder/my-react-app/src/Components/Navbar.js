import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import logo from '../Assets/logo.png';

const Navbar = () => {
  const [openPetsDropdown, setOpenPetsDropdown] = useState(false);
  const location = useLocation(); // Use location hook to access the current location

  const menuOptions = [
    {
      text: "Browse Pets ▼",
      icon: <HomeIcon />,
      options: [
        { text: "Dogs", link: "/dogs" },
        { text: "Cats", link: "/cats" },
        { text: "Birds", link: "/birds" },
        { text: "Small Critters", link: "/small-critters" },
      ],
    },
    { text: "About", icon: <InfoIcon />, link: "/about" },
    {
      text: "How It Works",
      icon: <CommentRoundedIcon />,
      link: "/#how_it_works",
    },
    { text: "Contact", icon: <PhoneRoundedIcon />, link: "/contact" },
    {
      text: "FAQs",
      icon: <ShoppingCartRoundedIcon />,
      link: "/#FAQ",
    },
    { text: "Donate", icon: <ShoppingCartRoundedIcon />, link: "/donate" },
  ];

  const handleLinkClick = (path) => {
    // Check if the current page is the home page and the path includes an in-page link
    if (location.pathname === '/' && (path === '/#how_it_works' || path === '/#FAQ')) {
      const sectionId = path.substring(2); // Extracts 'how_it_works' or 'FAQ' from the path
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="navbar-links-container">
        {menuOptions.map((item, index) => (
          <li key={index} className={item.options ? "dropdown" : ""}>
            {item.options ? (
              <>
                <button onClick={() => setOpenPetsDropdown(!openPetsDropdown)}>
                  {item.text}
                </button>
                {openPetsDropdown && (
                  <ul className="dropdown-content">
                    {item.options.map((option, index) => (
                      <li key={index}>
                        <Link to={option.link} onClick={() => handleLinkClick(option.link)}>
                          {option.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link to={item.link} onClick={() => handleLinkClick(item.link)}>
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
