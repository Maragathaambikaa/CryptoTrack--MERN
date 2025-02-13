import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import the specific icons you need
import './CommonStyles.css';  // Add specific styles if needed

const Contact = () => {
  return (
    <div className="page-container contact-page">
      <div className="page-overlay"></div>
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us!</p>
        <p>Email: support@cryptotrack.com</p>
        
        {/* Social media icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} color="#fff" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} color="#fff" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} color="#fff" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
