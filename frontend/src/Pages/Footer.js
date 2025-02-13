import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>CryptoTrack</h2>
        </div>
        <div className="footer-links">
          <p>&copy; 2025 CryptoTrack. All Rights Reserved.</p>
          <div className="footer-nav">
            <a href="/about">About</a> | 
            <a href="/contact">Contact</a> | 
            <a href="/privacy">Privacy</a> | 
            <a href="/faq">FAQ</a> | 
            <a href="/terms">Terms</a> | 
            <a href="/support">Support</a> | 
            <a href="/resources">Resources</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

