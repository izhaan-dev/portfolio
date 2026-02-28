import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/Project.css';
import { getAssetPath } from '../utils/getAssetPath';

const IZZIBS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();
    tl.to('.reveal-text', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Apple-style image animation on scroll
    gsap.utils.toArray('.izzibs-apple-img').forEach((img, i) => {
      gsap.to(img, {
        y: i === 0 ? -80 : i === 1 ? 60 : -40,
        scale: i === 1 ? 1.12 : 1,
        rotate: i === 0 ? -8 : i === 2 ? 8 : 0,
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        scrollTrigger: {
          trigger: img,
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <div className="project-page">
      <div className="project-container">
        {/* HEADER */}
        <header className="project-header">
          <h1 className="project-title reveal-text">IZZIBS<br/>Website</h1>
          <div className="project-meta reveal-text">
            <span>2026</span>
            <span>Petrochemical Consulting</span>
          </div>
        </header>

        {/* DETAILS */}
        <section className="project-details-grid">
          <div className="detail-column reveal-text">
            <h3>The Firm</h3>
            <p>
              IZZIBS is a petrochemical consulting firm. I developed the entire website, focusing on a professional, clean, and informative digital presence to showcase their expertise and services in the industry.
              <br/>
              <a href="https://izzibs.com" target="_blank" rel="noopener noreferrer" style={{color: '#0077cc', textDecoration: 'underline'}}>View Project</a>
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

        {/* IMAGE GALLERY - Apple Style Animation */}
        <section className="project-gallery-section">
          <div className="gallery-title">Website Preview</div>
          <div className="izzibs-apple-gallery" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', margin: '4rem 0' }}>
            <div className="izzibs-apple-img" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', width: '400px', height: '260px', background: '#111' }}>
              <img src={getAssetPath('/Izzibs/izzibs1.png')} alt="IZZIBS Preview 1" style={{ width: '120%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="izzibs-apple-img" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', width: '400px', height: '260px', background: '#111' }}>
              <img src={getAssetPath('/Izzibs/izzibs2.png')} alt="IZZIBS Preview 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="izzibs-apple-img" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', width: '400px', height: '260px', background: '#111' }}>
              <img src={getAssetPath('/Izzibs/izzibs3.png')} alt="IZZIBS Preview 3" style={{ width: '120%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      </div>
      {/* NEXT PROJECT LINK */}
      <Link to="/work/hasamtech" className="next-project-link">
        <span className="next-label">Next Project</span>
        <span className="next-title">HasamTech</span>
      </Link>
    </div>
  );
};

export default IZZIBS;
