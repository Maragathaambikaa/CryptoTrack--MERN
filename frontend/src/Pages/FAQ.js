import React from "react";
import "./FAQTermsSupportResources.css"; // Import the common CSS

const FAQ = () => {
  return (
    <div className="page-wrapper faq">
      <h1>Frequently Asked Questions</h1>
      <div className="question-answer">
        <div className="question">What is cryptocurrency?</div>
        <div className="answer">Cryptocurrency is a digital or virtual currency that uses cryptography for security.</div>
      </div>
      <div className="question-answer">
        <div className="question">How can I buy cryptocurrency?</div>
        <div className="answer">You can buy cryptocurrency from various exchanges such as Binance, Coinbase, or Kraken.</div>
      </div>
      {/* Add more FAQs as needed */}
    </div>
  );
};

export default FAQ;
