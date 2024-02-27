import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"

export const Navbar = () => {
    return (
    <nav>
        <Link to="/" className="title">Logo</Link>
        <ul>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/hiw">How It Works</NavLink>
            </li>
            <li>
                <NavLink to="/Donate">Donate</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
        </ul>
    </nav>
    )
}