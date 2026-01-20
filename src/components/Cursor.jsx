import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/Cursor.css'; // We will create this next

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Move cursor with mouse
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, // Quick follow
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return <div className="custom-cursor" ref={cursorRef}></div>;
};

export default Cursor;