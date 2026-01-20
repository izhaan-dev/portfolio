import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Project.css';

gsap.registerPlugin(ScrollTrigger);

const HasamTech = () => {

  useEffect(() => {
    // Parallax Effect for the vertical stack
    gsap.utils.toArray(".parallax-image").forEach((img) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          scrub: true
        }
      });
    });
  }, []);

  return (
    <div className="project-page">
      
      {/* UPDATED HEADER (Data Grid Style) */}
      <header className="project-header">
        <h1>HasamTech</h1>
        
        <div className="project-grid">
          <div className="grid-item">
            <span className="label">Role</span>
            <span className="value">Full Stack Dev</span>
          </div>
          <div className="grid-item">
            <span className="label">Timeline</span>
            <span className="value">8 Weeks</span>
          </div>
          <div className="grid-item">
            <span className="label">Stack</span>
            <span className="value">Python, React, SQL</span>
          </div>
          <div className="grid-item">
            <span className="label">Year</span>
            <span className="value">2024</span>
          </div>
        </div>
      </header>

      {/* Project Description */}
      <section className="content-block" style={{padding: '0 3rem 5rem'}}>
        <p style={{fontSize: '2rem', maxWidth: '800px', lineHeight: '1.4'}}>
          HasamTech required a robust solution for managing complex data flows. 
          I utilized Python for backend processing and React for a reactive, fast frontend.
        </p>
      </section>

      {/* Vertical Parallax Stack */}
      <div className="gallery-stack" style={{display: 'flex', flexDirection: 'column', gap: '5rem', padding: '0 3rem'}}>
        <div className="stack-item" style={{overflow: 'hidden', borderRadius: '12px', height: '80vh'}}>
          <img className="parallax-image" style={{width: '100%', height: '120%', objectFit: 'cover'}} src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop" alt="Code" />
        </div>
        <div className="stack-item" style={{overflow: 'hidden', borderRadius: '12px', height: '80vh'}}>
          <img className="parallax-image" style={{width: '100%', height: '120%', objectFit: 'cover'}} src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop" alt="Laptop" />
        </div>
      </div>

      {/* Next Project Link */}
      <section className="next-project">
        <h3>Next Project</h3>
        <Link to="/work/skeye">
          Skeye Accessories &rarr;
        </Link>
      </section>
    </div>
  );
};

export default HasamTech;