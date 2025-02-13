import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CryptoDetails.css";
import CryptoChart from "./CryptoChart"; // Import the chart component
import CurrencySelector from "./CurrencySelector"; // Import the CurrencySelector component

function CryptoDetails() {
  const { id } = useParams(); // Get coin ID from URL
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default to USD
  const [currencySymbol, setCurrencySymbol] = useState('$'); // Default to USD symbol

  const [email, setEmail] = useState(""); // State for email input
  const [targetPrice, setTargetPrice] = useState(""); // State for target price input

  useEffect(() => {
    // Fetch cryptocurrency details when the currency changes
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
      .then((response) => {
        setCrypto(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching crypto details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency); // Update selected currency

    // Set the appropriate currency symbol based on the selected currency
    switch (currency) {
      case 'INR':
        setCurrencySymbol('₹');
        break;
      case 'EUR':
        setCurrencySymbol('€');
        break;
      case 'GBP':
        setCurrencySymbol('£');
        break;
      case 'USD':
      default:
        setCurrencySymbol('$');
        break;
    }
  };

  // const setAlert = async () => {
  //   try {
  //     const fcmToken = localStorage.getItem("fcmToken"); // Get saved token
  //     await axios.post("http://localhost:5000/alerts", {
  //       coinId: crypto.id,
  //       coinName: crypto.name,
  //       targetPrice,
  //       email,
  //       fcmToken,
  //     });

  //     alert("🔔 Alert Set Successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error setting alert");
  //   }
  // };

  const setAlert = async () => {
    if (!email || !targetPrice) {
        alert("Please enter both Email and Target Price!");
        return;
    }

    try {
        const fcmToken = localStorage.getItem("fcmToken"); // Check if token exists

        const response = await axios.post("http://localhost:5000/alers", {
            coinId: crypto.id,
            coinName: crypto.name,
            targetPrice: Number(targetPrice), // Convert to number
            email,
            fcmToken: fcmToken || null, // Handle null token
        });

        alert(response.data.message); // Show success message from server
    } catch (error) {
        console.error("Error setting alert:", error);
        alert("Error setting alert. Please try again.");
    }
};



  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (!crypto) {
    return <p style={{ textAlign: "center" }}>Cryptocurrency not found.</p>;
  }

  // Fetch price and market data in the selected currency
  const priceInSelectedCurrency = crypto.market_data.current_price[selectedCurrency.toLowerCase()];
  const high24h = crypto.market_data.high_24h[selectedCurrency.toLowerCase()];
  const low24h = crypto.market_data.low_24h[selectedCurrency.toLowerCase()];
  const marketCap = crypto.market_data.market_cap[selectedCurrency.toLowerCase()];

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {/* Currency Selector */}
      <CurrencySelector onCurrencyChange={handleCurrencyChange} />

      <h2>
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </h2>
      <img src={crypto.image.large} alt={crypto.name} style={{ width: "100px" }} />
      <p>Market Rank: {crypto.market_cap_rank}</p>
      
      <p>
        Current Price ({selectedCurrency}): {currencySymbol} {priceInSelectedCurrency?.toLocaleString()}
      </p>
      <p>24h High: {currencySymbol} {high24h?.toLocaleString()}</p>
      <p>24h Low: {currencySymbol} {low24h?.toLocaleString()}</p>

      <p>
        Price Change (24h):{" "}
        <span
          className={crypto.market_data.price_change_percentage_24h >= 0 ? "positive" : "negative"}
        >
          {crypto.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>

      <p>Market Cap: {currencySymbol} {marketCap?.toLocaleString()}</p>
      <p>Total Supply: {crypto.market_data.total_supply?.toLocaleString() || "N/A"}</p>

      {/* Price Alert Section */}
      <div>
        <h3>Set Price Alert</h3>
        <input
          type="number"
          placeholder="Target Price"
          onChange={(e) => setTargetPrice(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={setAlert}>Set Price Alert</button>
      </div>

      {/* ✅ Integrating the CryptoChart component */}
      <h3>Price Chart (Last 30 Days)</h3>
      <CryptoChart coinId={id} selectedCurrency={selectedCurrency} />
    </div>
  );
}

export default CryptoDetails;
