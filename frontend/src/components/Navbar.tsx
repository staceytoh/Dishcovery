import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Link to the updated CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Dishcovery Logo */}
        <h1 className="logo">
          <Link to="/">Dishcovery</Link>
        </h1>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/surprise-me">Surprise Me!</Link>
          </li>
          <li>
            <Link to="/flavor-trip">Flavor Trip</Link>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
