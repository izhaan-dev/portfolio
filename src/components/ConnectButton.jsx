import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ConnectButton.css';

const ConnectButton = () => {
  return (
    <Link to="/connect" className="connect-button-container">
      <div className="rotating-text-wrapper">
        {/* FIX: Increased ViewBox from "0 0 200 200" to "-25 -25 250 250" 
            This adds padding INSIDE the SVG so text never touches the edge. 
        */}
        <svg viewBox="-25 -25 250 250" className="rotating-text-svg">
          <path 
            id="circlePath" 
            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0" 
            fill="none" 
          />
          
          <text className="circle-text">
            <textPath href="#circlePath" startOffset="0%">
              LET'S CONNECT • LET'S CONNECT • LET'S CONNECT •
            </textPath>
          </text>
        </svg>
        
        <div className="arrow-icon">
          ↗
        </div>
      </div>
    </Link>
  );
};

export default ConnectButton;