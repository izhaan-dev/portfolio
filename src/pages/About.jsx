import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/About.css';

const About = () => {
  const containerRef = useRef(null);
  const lightLayerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const aboutContainerRef = useRef(null); // Ref for GSAP Context

  // CONSTANTS
  const RADIUS = 200;

  useEffect(() => {
    // --- 1. SAFE GSAP ANIMATION (Fixes disappearing bug) ---
    let ctx = gsap.context(() => {
      gsap.fromTo(".about-content", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }, aboutContainerRef); // Scope selector to this component


    // --- 2. FLASHLIGHT LOGIC ---
    const updateFlashlight = () => {
      if (!containerRef.current || !lightLayerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const { x: mouseX, y: mouseY } = mouseRef.current;

      const rawX = mouseX - rect.left;
      const rawY = mouseY - rect.top;

      // Expanded Buffer Zone Logic
      const isInsideBuffer = 
        mouseX >= (rect.left - RADIUS) && 
        mouseX <= (rect.right + RADIUS) && 
        mouseY >= (rect.top - RADIUS) && 
        mouseY <= (rect.bottom + RADIUS);

      if (isInsideBuffer) {
        // Active: Follow mouse
        lightLayerRef.current.style.clipPath = `circle(${RADIUS}px at ${rawX}px ${rawY}px)`;
      } else {
        // Inactive: Clamp to edge and shrink
        const clampedX = Math.max(0, Math.min(rawX, rect.width));
        const clampedY = Math.max(0, Math.min(rawY, rect.height));
        lightLayerRef.current.style.clipPath = `circle(0px at ${clampedX}px ${clampedY}px)`;
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      updateFlashlight();
    };

    const handleScroll = () => {
      updateFlashlight();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert(); // CLEANUP: Kills animation prevents "opacity: 0" bug
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const aboutText = (
    <div className="text-block">
      <p>
        I am <strong>Izhaan</strong>, a 21-year-old Computer Science
        student at <strong>BITS Pilani Hyderabad</strong>.
        My journey started with lines of Python code
        and evolved into crafting immersive web
        experiences using React and GSAP.
      </p>
      <br />
      <p>
        I believe software shouldn't just work—it should
        feel alive. I combine my engineering background
        with a passion for motion design.
      </p>
    </div>
  );

  return (
    <div className="about-container" ref={aboutContainerRef}>
      {/* Added 'visible' class just to be safe */}
      <div className="about-content">
        <h1 className="about-header">About Me</h1>

        <div className="flashlight-wrapper" ref={containerRef}>
          {/* Layer 1: Dark Base */}
          <div className="layer dark-layer">
            {aboutText}
          </div>

          {/* Layer 2: Light Overlay */}
          <div 
            className="layer light-layer" 
            ref={lightLayerRef}
            style={{ clipPath: 'circle(0px at 50% 50%)' }} 
          >
            {aboutText}
          </div>
        </div>

        <div className="experience-list">
           <h3>Stack</h3>
           <div className="job">
             <span className="company">Languages</span>
             <span className="role">Python, SQL, JavaScript</span>
           </div>
           <hr />
           <div className="job">
             <span className="company">Frameworks</span>
             <span className="role">React, GSAP, Tailwind</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;