import React from "react";
import "./FAQTermsSupportResources.css"; // Import the common CSS

const Terms = () => {
  return (
    <div className="page-wrapper terms">
      <h1>Terms of Service</h1>
      <div className="section">
        <h3>Introduction</h3>
        <p>These terms govern your use of our services related to cryptocurrency tracking and news.</p>
      </div>
      <div className="section">
        <h3>User Obligations</h3>
        <p>As a user, you are expected to comply with all applicable laws while using this platform.</p>
      </div>
      {/* Add more terms sections as needed */}
    </div>
  );
};

export default Terms;
