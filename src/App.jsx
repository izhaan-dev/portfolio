import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import About from './pages/About';
import Skeye from './pages/Skeye';
import HasamTech from './pages/HasamTech';
import IZZIBS from './pages/IZZIBS';
import Background from './components/Background';
import Connect from './pages/Connect'; 
import ConnectButton from './components/ConnectButton';


const ScrollHandler = ({ lenisRef }) => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  }, [pathname, lenisRef]);
  return null;
};

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
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
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <ScrollHandler lenisRef={lenisRef} />
      <div className="App">
        <Cursor />
        <Navbar />
        <Background />
        <ConnectButton />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/work/skeye" element={<Skeye />} />
            <Route path="/work/hasamtech" element={<HasamTech />} />
            <Route path="/work/izzibs" element={<IZZIBS />} />
          
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;