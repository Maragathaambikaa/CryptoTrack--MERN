import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./CurrencySelector"; // Import the selector
import "./Portfolio.css";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

const Portfolio = () => {
  const [coins, setCoins] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [message, setMessage] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("usd"); // Default to USD

  useEffect(() => {
    fetchCoins();
    fetchPortfolio();
    fetchAlerts();
  }, [selectedCurrency]); // Refetch data when currency changes

  // Fetch coins with selected currency
  const fetchCoins = () => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}`)
      .then((response) => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coins:", error);
        setLoading(false);
      });
  };

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/portfolio`);
      setPortfolio(response.data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/alerts`);
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const handleAddCoin = async () => {
    if (coin && quantity > 0) {
      const selectedCoin = coins.find((c) => c.id === coin);
      if (selectedCoin) {
        const newCoin = {
          id: selectedCoin.id,
          name: selectedCoin.name,
          symbol: selectedCoin.symbol,
          price: selectedCoin.current_price,
          quantity: parseFloat(quantity),
        };

        try {
          await axios.post(`${API_BASE_URL}/api/portfolio`, newCoin);
          fetchPortfolio();
          setCoin("");
          setQuantity("");
        } catch (error) {
          console.error("Error adding coin:", error);
          setError("Failed to add coin. Try again.");
        }
      }
    }
  };

  const handleRemoveCoin = async (coinId) => {
    try {
      setPortfolio(portfolio.filter((coin) => coin._id !== coinId));
      await axios.delete(`${API_BASE_URL}/api/portfolio/${coinId}`);
      fetchPortfolio();
    } catch (error) {
      console.error("Error removing coin:", error);
      fetchPortfolio();
    }
  };

  const handleUpdateQuantity = async (coinId, newQuantity) => {
    if (newQuantity <= 0) return;
    try {
      await axios.put(`${API_BASE_URL}/api/portfolio/${coinId}`, {
        quantity: parseFloat(newQuantity),
      });
      fetchPortfolio();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleSetAlert = async () => {
    if (!coin || !targetPrice) {
      setMessage("Please select a coin and set a target price.");
      return;
    }
  
    const selectedCoin = coins.find((c) => c.id === coin);
    if (!selectedCoin) {
      setMessage("Invalid coin selection.");
      return;
    }
  
    try {
      await axios.post(`${API_BASE_URL}/api/alerts`, {
        coinId: selectedCoin.id,
        coinName: selectedCoin.name,
        targetPrice: parseFloat(targetPrice),
      });
  
      setMessage("Price alert set successfully!");
      setTargetPrice("");
      
      // Fetch the updated list of alerts
      fetchAlerts();  
    } catch (error) {
      console.error("Error setting alert:", error.response?.data || error.message);
      setMessage("Failed to set alert. Try again.");
    }
  };
  

  const handleRemoveAlert = async (alertId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/alerts/${alertId}`);
      setAlerts(alerts.filter((alert) => alert._id !== alertId)); // Update local state after removal
    } catch (error) {
      console.error("Error removing alert:", error);
    }
  };


  const totalValue = portfolio.reduce(
    (acc, coin) => acc + coin.price * coin.quantity,
    0
  );

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">Portfolio Tracker</h2>
      <h4><center>A hypothetical Wallet</center></h4>

      <CurrencySelector onCurrencyChange={setSelectedCurrency} />

      {loading ? (
        <p>Loading coins...</p>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}

          <div className="add-coin-container">
            <select value={coin} onChange={(e) => setCoin(e.target.value)}>
              <option value="">Select Coin</option>
              {coins.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol.toUpperCase()})
                </option>
              ))}
            </select>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              min="0.01"
            />

            <button onClick={handleAddCoin}>Add to Portfolio</button>
          </div>

          <div className="set-alert-container">
            <h3>Set Price Alert</h3>
            <select value={coin} onChange={(e) => setCoin(e.target.value)}>
              <option value="">Select Coin</option>
              {coins.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol.toUpperCase()})
                </option>
              ))}
            </select>

            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="Target Price"
              min="0.01"
            />

            <button onClick={handleSetAlert}>Set Alert</button>
          </div>


          <div className="portfolio-list">
            <h3>Your Portfolio</h3>
            {portfolio.length > 0 ? (
              <ul>
                {portfolio.map((coin) => (
                  <li key={coin._id}>
                    {coin.name} ({coin.symbol.toUpperCase()}) - {coin.quantity} @ {selectedCurrency.toUpperCase()} {coin.price.toFixed(2)} each
                    <button onClick={() => handleRemoveCoin(coin._id)}>Remove</button>
                    <input
                      type="number"
                      value={coin.quantity}
                      onChange={(e) => handleUpdateQuantity(coin._id, e.target.value)}
                      placeholder="Update Quantity"
                      min="0.01"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No coins added to portfolio.</p>
            )}

            <h4 className="total-value">Total Portfolio Value: {selectedCurrency.toUpperCase()} {totalValue.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
