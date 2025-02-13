import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cryptocurrency data
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((response) => {
        setCryptos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container"> {/* Apply the home-container class here */}
      <h2>Top 10 Cryptocurrencies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price (USD)</th>
              <th>Market Cap</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>
                  <a href={`/crypto/${crypto.id}`}>{crypto.name}</a>
                </td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td>${crypto.market_cap.toLocaleString()}</td>
                <td
                  style={{
                    color: crypto.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
