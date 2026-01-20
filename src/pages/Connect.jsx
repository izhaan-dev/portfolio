import React, { useEffect } from 'react';
import gsap from 'gsap';
import '../styles/Connect.css';

const Connect = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Reveal Header Title
    tl.fromTo(".connect-title .char", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out" }
    );

    // 2. Expand Horizontal Lines
    tl.to(".grid-row", 
      { scaleX: 1, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" },
      "-=0.5"
    );

    // 3. Reveal Vertical Dividers
    tl.to(".grid-item", 
      { borderRightColor: "rgba(255,255,255,0.1)", duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // 4. Slide Up Text Content
    tl.to(".grid-item > *", 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" },
      "-=0.8"
    );

    // 5. Reveal Footer Links
    tl.to(".social-column a", 
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );
    
    // 6. Reveal Year Text (Updated)
    tl.to(".year-text",
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

  }, []);

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char" style={{display: 'inline-block'}}>{char === " " ? "\u00A0" : char}</span>
    ));
  };

  return (
    <div className="connect-page">
      <div className="connect-container">
        
        {/* BIG HEADER */}
        <header className="connect-header">
          <h1 className="connect-title">
            <div className="mask-container">{splitText("LET'S")}</div>
            <div className="mask-container">{splitText("CONNECT")}</div>
          </h1>
        </header>

        {/* INFO GRID */}
        <div className="info-grid">
          <div className="grid-row header-row">
            <span>NAME</span>
            <span>EMAIL</span>
            <span>PHONE</span>
            <span>LOCATION</span>
          </div>

          <div className="grid-row content-row">
            {/* NAME */}
            <div className="grid-item">
              {/* <div className="star-icon">★</div> */}
              <h3>Izhaan Tatariya</h3>
              <p>UI/UX & Frontend Engineer</p>
            </div>

            {/* EMAIL */}
            <div className="grid-item hover-effect">
              {/* <div className="icon">✉️</div> */}
              <a href="mailto:izhaan.tatariya@gmail.com" className="contact-link email-small">izhaan.tatariya@gmail.com</a>
              <p className="sub-text">For professional inquiries</p>
            </div>

            {/* PHONE */}
            <div className="grid-item hover-effect">
              {/* <div className="icon">📱</div> */}
              <span className="contact-text">+91 8238069884</span>
              <p className="sub-text">WhatsApp available</p>
            </div>

            {/* LOCATION */}
            <div className="grid-item hover-effect">
              {/* <div className="icon">📍</div> */}
              <span className="contact-text">Hyderabad, India</span>
              <p className="sub-text">BITS Pilani Campus</p>
            </div>
          </div>
        </div>

        {/* SOCIALS FOOTER */}
        <div className="socials-footer">
          <div className="grid-row footer-row">
            <div className="social-column">
              <span className="label">SOCIALS</span>
              <div className="links-stack">
                <a href="https://www.linkedin.com/in/izhaan-tatariya-275443256/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
                <a href="https://instagram.com/izhxan" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
                <a href="https://github.com/izhaan-dev" target="_blank" rel="noreferrer">GITHUB ↗</a>
              </div>
            </div>
            
            <div className="signature-column">
              <span className="label">CURRENTLY</span>
              <p>Open to freelance & intern opportunities.</p>
              
              {/* CLEAN YEAR TEXT */}
              <div className="year-text">2026</div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Connect;