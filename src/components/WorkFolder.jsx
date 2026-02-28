import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/WorkFolder.css';
import { getAssetPath } from '../utils/getAssetPath';

const projects = [
  {
    id: 1,
    title: "Skeye Accessories",
    category: "E-Commerce",
    img: getAssetPath('/Skeye/skeye logo.png'),
    link: "/work/skeye",
  },
  {
    id: 2,
    title: "HasamTech",
    category: "Corporate Web",
    img: getAssetPath('/Hasamtech/hasamtech logo.png'),
    link: "/work/hasamtech",
  },
  {
    id: 3,
    title: "IZZIBS Website",
    category: "Consulting Web",
    img: getAssetPath('/Izzibs/Izzi logo.jpg'),
    link: "/work/izzibs",
  }
];

const WorkFolder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="folder-wrapper" style={{ position: 'relative' }}>

      {/* GLOW EFFECT */}
      <div className="folder-glow"></div>

      <motion.div 
        className="folder-container"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        whileHover={!isOpen ? "hover" : "open"}
        onClick={() => setIsOpen(!isOpen)}
      >
        
        {/* BACK PLATE */}
        <div className="folder-back">
          <div className="folder-tab"></div>
        </div>

        {/* PROJECT CARDS */}
        <div className="cards-stack">
          {projects.map((project, index) => {
            // Adjusted offsets for more visible cards in closed view
            const baseOffset = 60; // space between cards
            const offset = (index - (projects.length - 1) / 2) * baseOffset;
            return (
              <motion.div
                key={project.id}
                className="folder-card"
                variants={{
                  closed: {
                    x: offset,
                    y: Math.abs(index - 1) * 18, // slight vertical offset for outer cards
                    scale: 0.92 + (index * 0.04),
                    rotate: (index - 1) * 6,
                    zIndex: index
                  },
                  hover: {
                    y: -35,
                    rotate: (index - 1) * 10,
                    transition: { type: "spring", stiffness: 300 }
                  },
                  open: {
                    x: (index - 1) * 340,
                    y: -150,
                    scale: 1,
                    rotate: 0,
                    zIndex: 10 + index,
                    transition: { type: "spring", stiffness: 180, damping: 15 }
                  }
                }}
              >
                <Link
                  to={project.link}
                  className="card-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="card-image">
                    <img src={project.img} alt={project.title} />
                  </div>
                  <div className="card-info">
                    <h3>{project.title}</h3>
                    <span>{project.category}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* FRONT PLATE (Glass) */}
        <div className="folder-front">
          <div className="glass-reflection"></div>
          
          {/* NEW TECHNICAL LABEL */}
          <motion.div 
            className="folder-metadata"
            animate={{ opacity: isOpen ? 0 : 1 }}
          >
            <div className="meta-header">
              <span className="meta-title">ARCHIVE_26</span>
              <span className="meta-id">ID: 8238</span>
            </div>
            
            <div className="meta-barcode">
              {/* CSS generated barcode lines */}
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
            </div>

            <div className="meta-footer">
              <span>CONFIDENTIAL</span>
              <span className="meta-count">{projects.length} ITEMS</span>
            </div>
          </motion.div>

        </div>

      </motion.div>
      
      <motion.p 
        className="instruction-text"
        animate={{ opacity: isOpen ? 0 : 0.7, y: isOpen ? 20 : 0 }}
      >
        Click to Open
      </motion.p>
    </div>
  );
};

export default WorkFolder;