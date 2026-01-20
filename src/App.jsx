import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import About from './pages/About';
import Skeye from './pages/Skeye';
import HasamTech from './pages/HasamTech';
import Background from './components/Background';

// --- SCROLL HANDLER COMPONENT ---
// This component has access to the lenis instance via props or global scope if needed,
// but here we use a simple window reset that works well with Lenis's immediate mode.
const ScrollHandler = ({ lenisRef }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Force native scroll to top
    window.scrollTo(0, 0);
    
    // 2. Tell Lenis to snap to top immediately (bypassing smooth duration)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenisRef]);

  return null;
};

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });
    
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollHandler lenisRef={lenisRef} />
      <div className="App">
        <Cursor />
        <Navbar />
        
        {/* BACKGROUND LAYER (Fixed at Z-Index -1) */}
        <Background />

        {/* CONTENT LAYER (Relative at Z-Index 1) */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work/skeye" element={<Skeye />} />
            <Route path="/work/hasamtech" element={<HasamTech />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;