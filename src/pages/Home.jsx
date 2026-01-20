import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const servicesRef = useRef(null);

  // 1. Move Light to Cursor Position (Instant)
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Kill any ongoing "return" animations so the mouse takes over instantly
    gsap.killTweensOf(card);

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // 2. Return Light to Center (Smooth)
  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate Center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Animate CSS variables back to center
    gsap.to(card, {
      "--mouse-x": `${centerX}px`,
      "--mouse-y": `${centerY}px`,
      duration: 0.6,
      ease: "power3.out"
    });
  };

  useEffect(() => {
    // --- INITIALIZATION ---
    // Set the initial light position to the center for all cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${rect.width / 2}px`);
      card.style.setProperty('--mouse-y', `${rect.height / 2}px`);
    });

    // --- ANIMATIONS ---
    const tl = gsap.timeline();
    tl.fromTo(".hero-line span", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
    )
    .fromTo(".bio-reveal", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );

    gsap.utils.toArray(".project-card").forEach((card) => {
      gsap.fromTo(card, 
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" }
        }
      );
    });
  }, []);

  return (
    <div className="home-container">
      
      {/* --- HERO SECTION --- */}
      <section className="hero">
        <h1 className="hero-title">
          <div className="mask-container"><span className="hero-line">Crafting</span></div>
          <div className="mask-container"><span className="hero-line">Digital</span></div>
          <div className="mask-container"><span className="hero-line gray">Experiences</span></div>
        </h1>
        <div className="hero-bio">
          <p className="bio-reveal">I'm <strong>Izhaan</strong>. A 21-year-old CS Student at <strong>BITS Pilani Hyderabad</strong>.</p>
          <p className="bio-reveal">Blurring the line between UI/UX and Frontend Engineering.</p>
          <div className="tech-pills bio-reveal">
            <span>Python</span><span>React</span><span>SQL</span>
          </div>
        </div>
      </section>

      {/* --- SPOTLIGHT SERVICES SECTION --- */}
      <section className="services-section" ref={servicesRef}>
        
        {/* Card 01 */}
        <div 
          className="service-card" 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave} 
        >
          <div className="card-content">
            <div className="service-icon">✦</div>
            <h3>01</h3>
            <h4>Interface Design</h4>
            <p>Focusing on micro-interactions and clean aesthetics using Figma & Spline.</p>
          </div>
        </div>

        {/* Card 02 */}
        <div 
          className="service-card" 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-content">
            <div className="service-icon">⚡</div>
            <h3>02</h3>
            <h4>Development</h4>
            <p>Building scalable web apps with React, Python, and SQL.</p>
          </div>
        </div>

        {/* Card 03 */}
        <div 
          className="service-card" 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-content">
            <div className="service-icon">◎</div>
            <h3>03</h3>
            <h4>Motion</h4>
            <p>Adding life to interfaces with GSAP and Framer Motion.</p>
          </div>
        </div>
      </section>

      {/* --- WORK SECTION --- */}
      <section className="work-section">
        <Link to="/work/skeye">
          <div className="project-card">
            <div className="image-container">
              <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop" alt="Skeye Accessories" />
            </div>
            <div className="project-info">
              <h2>Skeye Accessories</h2>
              <p>E-Commerce Design</p>
            </div>
          </div>
        </Link>
        
        <Link to="/work/hasamtech">
          <div className="project-card">
            <div className="image-container">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop" alt="HasamTech" />
            </div>
            <div className="project-info">
              <h2>HasamTech</h2>
              <p>Web Development</p>
            </div>
          </div>
        </Link>
      </section>

    </div>
  );
};

export default Home;