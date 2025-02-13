import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    // Show landing page after 3 seconds
    const timer = setTimeout(() => setShowLanding(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showLanding) {
    return (
      <div className="welcome-page">
        <div className="welcome-overlay">
          <h1>Welcome to CryptoTrack!</h1>
          <p>Your go-to platform for managing cryptocurrency investments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Video & CRYPTOTRACK Text */}
      <header className="landing-header">
        <div className="overlay">
          <video autoPlay muted loop>
            <source
              src="https://cdn.pixabay.com/video/2020/03/30/34616-402679736_large.mp4"
              type="video/mp4"
            />
          </video>
          <h2>CRYPTOTRACK</h2>
        </div>
      </header>

      {/* Text & Button Below Video */}
      <section className="info-section">
        <p className="fade-in-text">Track, analyze, and manage your cryptocurrency investments easily.</p>
        <Link to="/home" className="cta-button zoom-in">Get Started</Link>
      </section>

      {/* Features Section Below Text */}
      <section className="features">
        <div className="feature-item track">
          <div className="feature-background">
            <h3>Track Cryptocurrencies</h3>
            <p>Stay up-to-date with real-time prices of your favorite coins.</p>
          </div>
        </div>

        <div className="feature-item portfolio">
          <div className="feature-background">
            <h3>Portfolio Management</h3>
            <p>Manage and track your crypto portfolio with ease.</p>
          </div>
        </div>

        <div className="feature-item news">
          <div className="feature-background">
            <h3>Latest Crypto News</h3>
            <p>Get the latest news and insights from the world of crypto.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;


