import React from 'react';
import { Link } from 'react-router-dom';

const TheEcho = () => {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      color: 'white',
      background: '#050505'
    }}>
      <h2 style={{ fontFamily: 'Space Grotesk', opacity: 0.8 }}>Echo...</h2>
      <h2 style={{ fontFamily: 'Space Grotesk', opacity: 0.5 }}>Echo...</h2>
      <h2 style={{ fontFamily: 'Space Grotesk', opacity: 0.2 }}>Echo...</h2>
      <Link to="/bored" style={{ marginTop: '2rem', color: '#666' }}>Go Back</Link>
    </div>
  );
};
export default TheEcho;