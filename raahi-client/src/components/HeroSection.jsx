import React from 'react';
import '../HeroSection.css'; // We'll create this file next

function HeroSection()  {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>DRIVE SMARTER. TRAVEL SAFER. REPORT FASTER.</h1>
        <div className="hero-buttons">
          <button className="btn btn-secondary">Login / Sign Up</button>
          <button className="btn btn-primary">Raise an Issue</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;