import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- THEMES CONFIGURATION (18 Options) ---
const THEMES = [
  { id: 0,  name: "Obsidian",   bg: "#050505", text: "#ffffff", accent: "#333333", desc: "The default void." },
  { id: 1,  name: "Blueprint",  bg: "#0044cc", text: "#ffffff", accent: "#4d88ff", desc: "Architectural purity." },
  { id: 2,  name: "Terminal",   bg: "#0d0d0d", text: "#00ff00", accent: "#003300", desc: "System online." },
  { id: 3,  name: "Paper",      bg: "#f4f4f0", text: "#222222", accent: "#d1d1d1", desc: "Clean slate." },
  { id: 4,  name: "Sunset",     bg: "#ff5e3a", text: "#ffea00", accent: "#b32400", desc: "Golden hour heat." },
  { id: 5,  name: "Lavender",   bg: "#cec2eb", text: "#4b0082", accent: "#a68cd4", desc: "Soft dreams." },
  { id: 6,  name: "Deep Sea",   bg: "#001f3f", text: "#7fdbff", accent: "#0074d9", desc: "Fathoms below." },
  { id: 7,  name: "Forest",     bg: "#1a2f1a", text: "#e0f2e0", accent: "#446644", desc: "Nature's code." },
  { id: 8,  name: "Cherry",     bg: "#640d14", text: "#ffccd5", accent: "#ad2831", desc: "Velvet crush." },
  { id: 9,  name: "Solar",      bg: "#fdf6e3", text: "#657b83", accent: "#b58900", desc: "High contrast day." },
  { id: 10, name: "Neon",      bg: "#110022", text: "#00ffff", accent: "#ff00ff", desc: "Cyberpunk nights." },
  { id: 11, name: "Concrete",  bg: "#808080", text: "#ffffff", accent: "#404040", desc: "Brutalist simplicity." },
  { id: 12, name: "Glacier",   bg: "#e0f7fa", text: "#006064", accent: "#00bcd4", desc: "Ice cold clarity." },
  { id: 13, name: "Midnight",  bg: "#191970", text: "#e6e6fa", accent: "#7b68ee", desc: "Deepest thoughts." },
  { id: 14, name: "Coffee",    bg: "#3e2723", text: "#d7ccc8", accent: "#8d6e63", desc: "Warm and grounded." },
  { id: 15, name: "Mint",      bg: "#e0f2f1", text: "#004d40", accent: "#26a69a", desc: "Fresh perspective." },
  { id: 16, name: "Vapor",     bg: "#ffccff", text: "#000080", accent: "#00ffff", desc: "Aesthetic waves." },
  { id: 17, name: "Gold",      bg: "#ffd700", text: "#333300", accent: "#daa520", desc: "Luxury state." },
];

// --- WHEEL CONFIG ---
// 18 items * 20 deg = 360 deg. Perfect loop.
const ANGLE_PER_ITEM = 20; 
const RADIUS = 500; 

const TheBox = () => {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  
  // Rotation Value (Degrees)
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 50, damping: 15, mass: 1 });

  // 1. SCROLL TO ROTATE + AUTO SNAP LOCK
  useEffect(() => {
    let snapTimeout;

    const handleWheel = (e) => {
      // Clear any pending snap to allow free scrolling
      clearTimeout(snapTimeout);

      const current = rotation.get();
      // Adjust scroll speed here
      rotation.set(current - e.deltaY * 0.08);

      // Set a timer: if no scroll for 300ms, snap to nearest item
      snapTimeout = setTimeout(() => {
        const currentRot = rotation.get();
        
        // Calculate the nearest multiple of 20 degrees
        const snapTarget = Math.round(currentRot / ANGLE_PER_ITEM) * ANGLE_PER_ITEM;
        
        // Smoothly animate to that lock position
        animate(rotation, snapTarget, { 
          type: "spring", 
          stiffness: 200, 
          damping: 30 
        });
      }, 750);
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(snapTimeout);
    };
  }, [rotation]);

  // 2. DETERMINE ACTIVE ITEM
  useEffect(() => {
    const unsubscribe = smoothRotation.on("change", (latest) => {
      const normalizedRot = -latest; 
      const rawIndex = Math.round(normalizedRot / ANGLE_PER_ITEM);
      const wrappedIndex = ((rawIndex % THEMES.length) + THEMES.length) % THEMES.length;
      
      if (wrappedIndex !== activeThemeIndex) {
        setActiveThemeIndex(wrappedIndex);
      }
    });
    return () => unsubscribe();
  }, [activeThemeIndex, smoothRotation]);

  const currentTheme = THEMES[activeThemeIndex];

  return (
    <motion.div 
      style={{
        height: '100vh',
        width: '100vw',
        background: currentTheme.bg,
        color: currentTheme.text,
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 0.5s ease, color 0.5s ease'
      }}
    >
      
      {/* GRID TEXTURE */}
      <div style={{ 
        position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${currentTheme.text} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.text} 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* --- THE WHEEL (Left Edge) --- */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: -50, 
        width: 0, height: 0, 
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {THEMES.map((theme, i) => {
          return (
            <WheelItem 
              key={theme.id}
              theme={theme}
              index={i}
              rotation={smoothRotation}
              isActive={activeThemeIndex === i}
              currentTheme={currentTheme}
              onClick={() => {
                const targetBase = -(i * ANGLE_PER_ITEM);
                animate(rotation, targetBase, { type: "spring", stiffness: 60, damping: 20 });
              }}
            />
          );
        })}
      </div>

      {/* --- ACTIVE INDICATOR LINE --- */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 550, 
        width: '80px',
        height: '2px',
        background: currentTheme.accent,
        transform: 'translateY(-50%)',
        zIndex: 5
      }} />

      {/* --- RIGHT PANEL (Details) --- */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
        textAlign: 'left',
        maxWidth: '500px',
        zIndex: 10
      }}>
        <motion.div
           key={currentTheme.id}
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.4, ease: "circOut" }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', opacity: 0.6 }}>
             <span style={{ fontSize: '0.9rem', fontFamily: 'Space Grotesk' }}>ID // {String(activeThemeIndex).padStart(2, '0')}</span>
          </div>

          <h1 style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontSize: '6rem', 
            lineHeight: 0.9,
            margin: '0 0 1.5rem 0',
            textTransform: 'uppercase'
          }}>
            {currentTheme.name}
          </h1>
          
          <p style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: '1.1rem', 
            lineHeight: 1.6,
            opacity: 0.8,
            borderLeft: `4px solid ${currentTheme.accent}`,
            paddingLeft: '1rem'
          }}>
            {currentTheme.desc}
          </p>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.5, fontFamily: 'Inter' }}>PALETTE</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ColorSwatch color={currentTheme.bg} label="BG" border={currentTheme.text} />
              <ColorSwatch color={currentTheme.text} label="TXT" />
              <ColorSwatch color={currentTheme.accent} label="ACC" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* EXIT LINK */}
      <Link to="/bored" style={{
        position: 'absolute',
        bottom: '3rem',
        right: '4rem',
        color: currentTheme.text,
        opacity: 0.5,
        textDecoration: 'none',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.9rem',
        borderBottom: `1px solid ${currentTheme.text}`,
        paddingBottom: '2px'
      }}>
        Exit Theme Lab
      </Link>

    </motion.div>
  );
};

// --- HELPER: Color Swatch ---
const ColorSwatch = ({ color, label, border }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
    <div style={{ 
      width: '40px', height: '40px', borderRadius: '50%', 
      background: color, 
      border: border ? `1px solid ${border}` : 'none',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }} />
    <span style={{ fontSize: '0.6rem', opacity: 0.5, fontFamily: 'Space Grotesk' }}>{label}</span>
  </div>
);

// --- HELPER: Individual Wheel Item (Updated for Immediate Render) ---
const WheelItem = ({ theme, index, rotation, isActive, currentTheme, onClick }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const baseAngle = index * ANGLE_PER_ITEM;

    // 1. Logic for updating position
    const updatePosition = (latestRotation) => {
      const currentAngle = baseAngle + latestRotation;
      
      let normAngle = ((currentAngle % 360) + 360) % 360;
      if (normAngle > 180) normAngle -= 360;
      const dist = Math.abs(normAngle);
      
      const isVisible = dist < 120;
      if (!isVisible) {
         setStyle({ display: 'none' }); 
         return;
      }

      // Scale and Opacity Logic
      const scale = 1 - (dist / 220); 
      const opacity = isActive ? 1 : Math.max(0.1, 1 - (dist / 60));

      setStyle({
        display: 'flex',
        transform: `rotate(${currentAngle}deg) translate(${RADIUS}px) rotate(${-currentAngle}deg)`,
        opacity: opacity,
        scale: Math.max(0, scale),
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      });
    };

    // 2. Initial Call (Render on Mount)
    updatePosition(rotation.get());

    // 3. Subscribe to updates
    const unsubscribe = rotation.on("change", updatePosition);
    return () => unsubscribe();
  }, [rotation, index, isActive]);

  const textColor = currentTheme.text;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: 0, top: 0,
        width: 0, height: 0,
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        ...style
      }}
    >
      <motion.div
        animate={{ paddingLeft: isActive ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '500px', 
          transformOrigin: 'left center',
        }}
      >
        {/* TEXT COMPONENT */}
        <motion.span
          animate={{
            fontSize: isActive ? '3.5rem' : '2rem',
            // Font weight is CONSTANT now to avoid jitter
            color: textColor,
            letterSpacing: isActive ? '-2px' : '0px',
            opacity: isActive ? 1 : 0.5
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 0.5
          }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400, // Kept constant
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            lineHeight: 1,
            WebkitTextStroke: isActive ? '0px' : `1px ${textColor}40`
          }}
        >
          {theme.name}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default TheBox;