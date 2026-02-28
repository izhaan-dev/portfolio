import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/Project.css';
import { getAssetPath } from '../utils/getAssetPath';

gsap.registerPlugin(ScrollTrigger);

const HasamTech = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline();

    // 1. Reveal Text
    tl.to(".reveal-text", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    });

    // 2. Parallax Image Effect
    const images = document.querySelectorAll(".v-image-card img");
    
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: 20, // Moves the image down slightly as we scroll
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom", // Start when card enters viewport
          end: "bottom top",   // End when card leaves viewport
          scrub: true,         // Links animation to scroll speed
        }
      });
    });

  }, []);

  return (
    <div className="project-page">
      <div className="project-container">
        
        {/* HEADER */}
        <header className="project-header">
          <h1 className="project-title reveal-text">Hasam<br/>Tech</h1>
          <div className="project-meta reveal-text">
            <span>2026</span>
            <span>Consultancy</span>
          </div>
        </header>

        {/* DETAILS */}
        <section className="project-details-grid">
          <div className="detail-column reveal-text">
            <h3>The Firm</h3>
            <p>
              HasamTech is a professional consultancy firm providing strategic business solutions. 
              I developed a clean, corporate platform that handles data-heavy client requests efficiently while maintaining a fast user interface.
              <br/>
              <a href="https://hasamtech.com" target="_blank" rel="noopener noreferrer" style={{color: '#0077cc', textDecoration: 'underline'}}>View Project</a>
            </p>
          </div>
          <div className="detail-column reveal-text">
            <h3>Tech Stack</h3>
            <ul className="tech-list">
              <li>React.js</li>
              <li>Python</li>
              <li>SQL</li>
            </ul>
          </div>
        </section>

        {/* VERTICAL PARALLAX GALLERY */}
        <section className="project-gallery-section">
          <div className="gallery-title">System Architecture</div>
          <div className="vertical-gallery">
            {/* Placeholder Images */}
            <div className="v-image-card">
              <img src={getAssetPath('/Hasamtech/hasamtech1.png')} alt="Dashboard Analytics" />
            </div>
            <div className="v-image-card">
              <img src={getAssetPath('/Hasamtech/hasamtech2.png')} alt="Data Visualization" />
            </div>
            <div className="v-image-card">
              <img src={getAssetPath('/Hasamtech/hasamtech3.png')} alt="Code Structure" />
            </div>
          </div>
        </section>

      </div>

      {/* NEXT PROJECT LINK */}
      <Link to="/work/skeye" className="next-project-link">
        <span className="next-label">Next Project</span>
        <span className="next-title">Skeye Accessories</span>
      </Link>

    </div>
  );
};

export default HasamTech;