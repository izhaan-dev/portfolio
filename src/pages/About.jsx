import React, { useEffect } from 'react';
import '../styles/About.css';

const About = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const wrapper = document.querySelector('.about-text-wrapper');
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        wrapper.style.setProperty('--x', `${x}px`);
        wrapper.style.setProperty('--y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
        
        {/* Flashlight Text Wrapper */}
        <div className="about-text-wrapper">
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