import React from 'react';
import '../styles/Background.css';

const Background = () => {
  return (
    <div className="ambient-background">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="noise-overlay"></div>
    </div>
  );
};

export default Background;