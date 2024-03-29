import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openPetsDropdown, setOpenPetsDropdown] = useState(false); // State for the "Browse Pets" dropdown
  const menuOptions = [
    {
      text: "Browse Pets ▼",
      icon: <HomeIcon />,
      // Nested options for the "Browse Pets" dropdown
      options: [
        { text: "Dogs", icon: <HomeIcon /> },
        { text: "Cats", icon: <HomeIcon /> },
        { text: "Birds", icon: <HomeIcon /> },
        { text: "Small Critters", icon: <HomeIcon /> },

      ],
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "How It Works",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Donate",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={""} alt="" />
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item, index) => (
          <div key={index}>
            {item.options ? (
            <div className="dropdown">
            {/* Render the button to toggle the dropdown */}
            <button className="browse-pets-button" onClick={() => setOpenPetsDropdown(!openPetsDropdown)}>
              {item.text}
            </button>
            
            {/* Render nested options if the dropdown is open */}
            {openPetsDropdown &&
              <div className="dropdown-content">
                {item.options.map((option, index) => (
                  <a href="#" key={index}>
                    {option.text}
                  </a>
                ))}
              </div>
            }
          </div>
            ) : (
              // If no nested options, render a regular link
              <a href="#">{item.text}</a>
            )}
          </div>
        ))}
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="right"
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;