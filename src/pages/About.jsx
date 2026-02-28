import React, { useEffect, useRef } from 'react';
import '../styles/About.css';

const About = () => {
  // Use refs to track the wrapper element and the last known mouse position
  const wrapperRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Helper function to calculate and set the CSS variables
    const updateFlashlight = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = mousePos.current.x - rect.left;
        const y = mousePos.current.y - rect.top;
        wrapperRef.current.style.setProperty('--x', `${x}px`);
        wrapperRef.current.style.setProperty('--y', `${y}px`);
      }
    };

    const handleMouseMove = (e) => {
      // 1. Update the stored mouse position
      mousePos.current = { x: e.clientX, y: e.clientY };
      // 2. Update the flashlight
      updateFlashlight();
    };

    const handleScroll = () => {
      // When scrolling, recalculate using the last known mouse position
      updateFlashlight();
    };

    // Listen to both mouse movement and scrolling
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // The text content used in both layers
  const content = (
    <>
      <p>
        I am <strong>Izhaan</strong>, a 21-year-old Computer Science student at <strong>BITS Pilani Hyderabad</strong>. 
        My journey started with lines of Python code and evolved into crafting immersive web experiences using React and GSAP.
      </p>
      <p>
        I believe software shouldn't just work—it should feel alive. I combine my engineering background with a passion for motion design to build digital products that leave a lasting impression.
      </p>
    </>
  );

  return (
    <div className="about-page">
      <div className="about-container">
        
        {/* Title */}
        <h1 className="about-title">About Me</h1>
        
        {/* Flashlight Text Wrapper - Attached the ref here! */}
        <div className="about-text-wrapper" ref={wrapperRef}>
          {/* Layer 1: Dim Text (Always visible but dark) */}
          <div className="about-text-dim">
            {content}
          </div>

          {/* Layer 2: Lit Text (Revealed by flashlight mask) */}
          <div className="about-text-lit">
            {content}
          </div>
        </div>

        {/* Stack Section */}
        <div className="stack-section">
          <h2>Stack</h2>
          <div className="stack-grid">
            <div className="stack-row">
              <span className="stack-label">Languages</span>
              <span className="stack-value">Python, SQL, JavaScript</span>
            </div>
            <div className="stack-row">
              <span className="stack-label">Frameworks</span>
              <span className="stack-value">React, GSAP, Tailwind</span>
            </div>
            <div className="stack-row">
              <span className="stack-label">Tools</span>
              <span className="stack-value">Figma, Git, Vite</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;