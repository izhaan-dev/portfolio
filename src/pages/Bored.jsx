import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Bored.css';

const Bored = () => {
  return (
    <div className="bored-container">
      <h1 className="bored-title">Choose your distraction.</h1>
      
      <div className="bored-grid">
        <Link to="/bored/void" className="bored-card">
          <div className="card-icon">⚫</div>
          <h2>The Void</h2>
          <p>Particles in suspension.</p>
        </Link>

        <Link to="/bored/box" className="bored-card">
          <div className="card-icon">📦</div>
          <h2>The Box</h2>
          <p>Physics confined.</p>
        </Link>

        <Link to="/bored/echo" className="bored-card">
          <div className="card-icon">🔊</div>
          <h2>The Echo</h2>
          <p>Repeat after me.</p>
        </Link>
      </div>
    </div>
  );
};

export default Bored;