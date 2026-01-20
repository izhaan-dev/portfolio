import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Project.css';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Skeye = () => {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current.offsetWidth
        }
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="project-page">
      <header className="project-header">
        <h1>Skeye Accessories</h1>
        
        <div className="project-grid">
          <div className="grid-item">
            <span className="label">Role</span>
            <span className="value">UI/UX Design</span>
          </div>
          <div className="grid-item">
            <span className="label">Timeline</span>
            <span className="value">4 Weeks</span>
          </div>
          <div className="grid-item">
            <span className="label">Stack</span>
            <span className="value">Figma, React, GSAP</span>
          </div>
          <div className="grid-item">
            <span className="label">Year</span>
            <span className="value">2024</span>
          </div>
        </div>
      </header>

      {/* Horizontal Scroll Section */}
      <div ref={slider} className="horizontal-container">
        <div className="panel description-panel">
          <h2>The Concept</h2>
          <p>A luxury e-commerce experience designed to highlight the intricate details of accessories. The focus was on minimalism and high-fidelity imagery.</p>
        </div>
        <div className="panel image-panel">
           <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2193&auto=format&fit=crop" alt="screen 1" />
        </div>
        <div className="panel image-panel">
           <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" alt="screen 2" />
        </div>
        <div className="panel image-panel">
           <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" alt="screen 3" />
        </div>
      </div>

      <section className="next-project">
        <h3>Next Project</h3>
        {/* 2. Use Link instead of <a> and use &rarr; for the arrow */}
        <Link to="/work/hasamtech">
          HasamTech &rarr;
        </Link>
      </section>
    </div>
  );
};

export default Skeye;