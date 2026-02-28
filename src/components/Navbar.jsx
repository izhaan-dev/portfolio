import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">IZHAAN</div>
      <div className="links">
        <Link to="/">Work</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;