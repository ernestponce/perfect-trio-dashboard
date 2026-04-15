import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Import images directly from the assets folder
import princeImg from './assets/princeprofile.jpg';
import alfredImg from './assets/redprofile.jpg';
import ernestImg from './assets/ernprofile.jpg';

// --- Background Binary Rain Component ---
const BinaryRain = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const cols = Array.from({ length: 30 }).map((_, i) => {
      const binaryString = Array.from({ length: Math.floor(Math.random() * 15) + 15 })
        .map(() => Math.round(Math.random()))
        .join('');
      return {
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${12 + Math.random() * 25}s`,
        animationDelay: `-${Math.random() * 20}s`,
        opacity: 0.05 + Math.random() * 0.1,
        text: binaryString
      };
    });
    setColumns(cols);
  }, []);

  return (
    <div className="binary-container">
      {columns.map(col => (
        <div key={col.id} className="binary-column" style={col}>
          {col.text}
        </div>
      ))}
    </div>
  );
};

// --- Interactive 3D Card Component ---
const ProfileCard = ({ profile }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (-1 to 1)
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    // Tilt the card based on mouse position
    const rotateX = y * -15; // Max 15 degrees tilt
    const rotateY = x * 15;
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    // Reset to flat when mouse leaves
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <a 
      href={profile.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="pro-card-wrapper"
    >
      <div 
        className="pro-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transformStyle }}
      >
        <div className="card-content">
          <div className="avatar-container">
            <div className="holographic-ring"></div>
            <img src={profile.image} alt={profile.name} className="avatar-img" />
          </div>
          <h2 className="card-name">{profile.name}</h2>
          <span className="card-status">View Portfolio</span>
        </div>
      </div>
    </a>
  );
};

// --- Main App Component ---
function App() {
  const profiles = [
    {
      name: "Prince Dwayne C. Bautista",
      image: princeImg,
      link: "https://portfolioo-navy-six.vercel.app/"
    },
    {
      name: "Alfred II N. Enteria",
      image: alfredImg,
      link: "https://portfoli-o-tau.vercel.app/"
    },
    {
      name: "Ernest Q. Ponce",
      image: ernestImg,
      link: "https://ernest-portfolio-six.vercel.app/"
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="grid-background"></div>
      <BinaryRain />

      <div className="content-wrapper">
        <header className="dashboard-header">
          {/* Note the data-text attribute is used for the CSS glitch effect */}
          <h1 className="glitch-title-pro" data-text="The Perfect Trio">
            The Perfect Trio
          </h1>
          <p className="pro-subtitle">System initialized. Select a profile to establish connection.</p>
        </header>

        <main className="profiles-container">
          {profiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </main>

        <footer className="dashboard-footer">
          <a 
            href="https://wedding-beryl-zeta.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="invite-action-btn"
          >
            <span className="btn-glow-wrap">
              <span className="btn-text">INITIALIZE INVITATION</span>
              <span className="btn-icon">→</span>
            </span>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;