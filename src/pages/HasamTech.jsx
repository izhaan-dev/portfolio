import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/Project.css';

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
            {/* Image 1 */}
            <div className="v-image-card">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Dashboard Analytics" />
            </div>

            {/* Image 2 */}
            <div className="v-image-card">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" alt="Data Visualization" />
            </div>
            
             {/* Image 3 */}
             <div className="v-image-card">
              <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop" alt="Code Structure" />
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