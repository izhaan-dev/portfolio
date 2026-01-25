import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TheVoid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // CONFIGURATION
    const particleCount = 1800;
    const sphereRadius = 250;
    const perspective = 800;
    
    // RESTORED PHYSICS SETTINGS
    const repelRadius = 100; 
    const repelStrength = 40; 
    
    let rotationSpeedX = 0.001;
    let rotationSpeedY = 0.001;
    
    // STATE
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    
    canvas.width = width;
    canvas.height = height;

    // GENERATE PARTICLES
    const particles = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); 

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y); 
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      particles.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        originalX: x * sphereRadius,
        originalY: y * sphereRadius,
        originalZ: z * sphereRadius,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`, 
        size: Math.random() * 1.5 + 0.5
      });
    }

    // INTERACTION HANDLERS
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;
      isHovering = true;
      
      rotationSpeedX = (mouseY / height) * 0.01;
      rotationSpeedY = (mouseX / width) * 0.01;
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      rotationSpeedX = 0.001;
      rotationSpeedY = 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // ANIMATION LOOP
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.sort((a, b) => b.z - a.z);

      particles.forEach(p => {
        // ROTATION
        let y = p.y;
        let z = p.z;
        p.y = y * Math.cos(rotationSpeedX) - z * Math.sin(rotationSpeedX);
        p.z = z * Math.cos(rotationSpeedX) + y * Math.sin(rotationSpeedX);

        let x = p.x;
        z = p.z;
        p.x = x * Math.cos(rotationSpeedY) - z * Math.sin(rotationSpeedY);
        p.z = z * Math.cos(rotationSpeedY) + x * Math.sin(rotationSpeedY);

        // PROJECTION
        const scale = perspective / (perspective + p.z);
        let projectedX = p.x * scale + width / 2;
        let projectedY = p.y * scale + height / 2;

        // REPEL LOGIC
        if (isHovering) {
          const canvasMouseX = mouseX + width / 2;
          const canvasMouseY = mouseY + height / 2;
          const dx = projectedX - canvasMouseX;
          const dy = projectedY - canvasMouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < repelRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (repelRadius - distance) / repelRadius; 
            const moveDist = force * repelStrength;
            
            projectedX += Math.cos(angle) * moveDist;
            projectedY += Math.sin(angle) * moveDist;
          }
        }

        // DRAW
        const alpha = (scale - 0.5); 
        if (alpha > 0) {
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, p.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black', overflow: 'hidden' }}>
      
      {/* 1. CANVAS */}
      <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', top: 0, left: 0 }} />

      {/* 2. LEFT PANEL */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '5%',
        transform: 'translateY(-50%)',
        textAlign: 'left',
        zIndex: 10,
        maxWidth: '300px'
      }}>
        <h1 style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontSize: '4rem', 
          color: 'white', 
          lineHeight: '1',
          marginBottom: '1rem',
          textTransform: 'uppercase'
        }}>
          The<br/>Void
        </h1>
        
        <div style={{ height: '2px', width: '50px', background: 'white', marginBottom: '2rem' }}></div>

        <Link to="/bored" style={{
          display: 'inline-block',
          color: 'rgba(255,255,255,0.8)',
          textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '0.8rem 2rem',
          borderRadius: '50px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'white';
          e.currentTarget.style.color = 'black';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
        }}
        >
          ← Exit Simulation
        </Link>
      </div>

      {/* 3. RIGHT PANEL */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        transform: 'translateY(-50%)',
        textAlign: 'right',
        zIndex: 10,
        maxWidth: '300px',
        color: '#888'
      }}>
        <h3 style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          color: 'white', 
          marginBottom: '1rem',
          fontSize: '1.2rem'
        }}>
          System Parameters
        </h3>
        <p style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontSize: '0.9rem', 
          lineHeight: '1.6', 
          marginBottom: '1.5rem' 
        }}>
          A generative particle system built on the Fibonacci Sphere algorithm for equidistant point distribution. 
        </p>
        <p style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontSize: '0.9rem', 
          lineHeight: '1.6' 
        }}>
          Motion is governed by 3D rotation matrices, while cursor interaction triggers a radial repulsion force field that distorts the spherical mesh in real-time.
        </p>
        
        <div style={{ 
          marginTop: '2rem', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '1rem',
          fontSize: '0.8rem',
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
          <span>PTS: 1,800</span>
          <span>FPS: 60</span>
        </div>
      </div>

    </div>
  );
};

export default TheVoid;