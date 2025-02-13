import React from "react";
import "./FAQTermsSupportResources.css"; // Import the common CSS

const Support = () => {
  return (
    <div className="page-wrapper support">
      <h1>Support</h1>
      <div className="support-item">
        <h3>How to reset your password?</h3>
        <p>If you forget your password, you can reset it by clicking the "Forgot Password" link on the login page.</p>
      </div>
      <div className="support-item">
        <h3>Contacting Customer Support</h3>
        <p>You can contact our support team at support@cryptotrack.com for any issues.</p>
      </div>
      {/* Add more support items as needed */}
    </div>
  );
};

export default Support;
