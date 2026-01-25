import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import WorkFolder from '../components/WorkFolder';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const servicesRef = useRef(null);

  // 1. Move Light to Cursor Position (Instant)
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.killTweensOf(card);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // 2. Return Light to Center (Smooth)
  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    gsap.to(card, {
      "--mouse-x": `${centerX}px`,
      "--mouse-y": `${centerY}px`,
      duration: 0.6,
      ease: "power3.out"
    });
  };

  useEffect(() => {
    // Initial light setup
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${rect.width / 2}px`);
      card.style.setProperty('--mouse-y', `${rect.height / 2}px`);
    });

    // --- 1. HERO ANIMATION ---
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

    // --- 2. SERVICES ANIMATION (Updated) ---
    gsap.fromTo(".service-card", 
      { y: 100, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        // REMOVED stagger: 0.2 -> Cards now load together
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- 3. WORK FOLDER ANIMATION ---
    gsap.fromTo(".work-section > *",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-section",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

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

      {/* --- SERVICES SECTION --- */}
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

      {/* --- WORK FOLDER SECTION --- */}
      <section className="work-section">
        <h2 className="section-header">Selected Works</h2>
        <WorkFolder />
      </section>

    </div>
  );
};

export default Home;