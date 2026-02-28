import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import '../styles/Project.css';
import { getAssetPath } from '../utils/getAssetPath';

const Skeye = () => {
  const galleryRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);

  // --- NEW RELIABLE IMAGE LINKS ---
  const images = [
    getAssetPath('/Skeye/skeye1.png'),
    getAssetPath('/Skeye/skeye2.png'),
    getAssetPath('/Skeye/skeye3.png'),
    getAssetPath('/Skeye/skeye4.png')
  ];

  // Auto-Rotate Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  // Initial Page Animations
  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline();
    
    tl.to(".reveal-text", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    })
    .fromTo(galleryRef.current, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  // Helper to determine class based on index
  const getCardClass = (index) => {
    if (index === activeIndex) return "carousel-card active";
    if (index === (activeIndex + 1) % images.length) return "carousel-card next";
    if (index === (activeIndex - 1 + images.length) % images.length) return "carousel-card prev";
    return "carousel-card hidden";
  };

  return (
    <div className="project-page">
      <div className="project-container">
        
        {/* HEADER */}
        <header className="project-header">
          <h1 className="project-title reveal-text">Skeye<br/>Accessories</h1>
          <div className="project-meta reveal-text">
            <span>2025</span>
            <span>E-Commerce</span>
          </div>
        </header>

        {/* DETAILS */}
        <section className="project-details-grid">
          <div className="detail-column reveal-text">
            <h3>The Brand</h3>
            <p>
              Skeye is a modern accessory brand specializing in minimalist rings, necklaces, and curated jewelry pieces. 
              The goal was to build a digital storefront that reflects the elegance of the physical products.
            </p>
          </div>
          <div className="detail-column reveal-text">
            <h3>Tech Stack</h3>
            <ul className="tech-list">
              <li>React.js</li>
              <li>Vite</li>
              <li>SQL</li>
            </ul>
          </div>
        </section>

      </div>

      {/* AUTO-ROTATING CAROUSEL */}
      <section className="project-gallery-section" ref={galleryRef}>
        <div className="project-container">
          <div className="gallery-title">Visual Identity</div>
        </div>
        
        <div className="carousel-container">
          {images.map((img, index) => (
            <div key={index} className={getCardClass(index)}>
              <img src={img} alt={`Skeye Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* NEXT PROJECT LINK */}
      <Link to="/work/izzibs" className="next-project-link">
        <span className="next-label">Next Project</span>
        <span className="next-title">IZZIBS Website</span>
      </Link>

    </div>
  );
};

export default Skeye;