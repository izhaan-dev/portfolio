import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/WorkFolder.css';

const projects = [
  {
    id: 1,
    title: "Skeye Accessories",
    category: "E-Commerce",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop",
    link: "/work/skeye",
  },
  {
    id: 2,
    title: "HasamTech",
    category: "Corporate Web",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    link: "/work/hasamtech",
  }
];

const WorkFolder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="folder-wrapper">
      
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
            const offset = (index - (projects.length - 1) / 2) * 360; 
            
            return (
              <motion.div
                key={project.id}
                className="folder-card"
                variants={{
                  closed: { 
                    x: index * 5, 
                    y: 0, 
                    rotate: index % 2 === 0 ? -2 : 2,
                    scale: 0.95 + (index * 0.02),
                    zIndex: index
                  },
                  hover: {
                    y: -35,
                    rotate: index % 2 === 0 ? -4 : 4,
                    transition: { type: "spring", stiffness: 300 }
                  },
                  open: { 
                    x: offset,
                    y: -150, 
                    rotate: 0,
                    scale: 1, 
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
        animate={{ opacity: isOpen ? 0 : 0.4, y: isOpen ? 20 : 0 }}
      >
        Click to initialize
      </motion.p>
    </div>
  );
};

export default WorkFolder;