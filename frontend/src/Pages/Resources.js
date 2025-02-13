import React from "react";
import "./FAQTermsSupportResources.css"; // Import the common CSS

const Resources = () => {
  return (
    <div className="page-wrapper resources">
      <h1>Crypto Resources</h1>
      <div className="resource-item">
        <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer">Binance Exchange</a>
        <p>One of the largest cryptocurrency exchanges globally.</p>
      </div>
      <div className="resource-item">
        <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko API</a>
        <p>Get access to cryptocurrency data through the CoinGecko API.</p>
      </div>
      {/* Add more resource items as needed */}
    </div>
  );
};

export default Resources;
