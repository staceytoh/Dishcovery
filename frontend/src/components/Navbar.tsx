import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: Add CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Dishcovery Logo */}
      <h1 className="logo text-2xl font-bold">
        <Link to="/" className="text-white hover:underline">Dishcovery</Link>
      </h1>

      {/* Navigation Links */}
      <ul className="nav-links flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/surprise-me" className="hover:underline">Surprise Me!</Link></li>
        <li><Link to="/flavor-trip" className="hover:underline">Flavor Trip</Link></li>
      </ul>

      {/* Social Media Icons */}
      <div className="social-icons flex space-x-4">
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
    </nav>
  );
};

export default Navbar;