import React, { useState, useEffect } from "react";
import axios from "axios";
import './ConversionCalculator.css';

function ConversionCalculator() {
  console.log("Rendering ConversionCalculator..."); // Debugging line

  const [cryptoList, setCryptoList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("usd");
  const [amount, setAmount] = useState(1);
  const [convertedValue, setConvertedValue] = useState(null);

  // Fetch available cryptocurrencies from CoinGecko
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
            },
          }
        );
        setCryptoList(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      }
    };

    fetchCryptos();
  }, []);

  // Handle conversion
  const handleConvert = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: fromCurrency,
            vs_currencies: toCurrency,
          },
        }
      );

      const rate = response.data[fromCurrency][toCurrency];
      setConvertedValue(rate * amount);
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
    }
  };

  return (
    <div className="conversion-calculator">
      <h2>Cryptocurrency Conversion Calculator</h2>

      <div className="form">
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>
      </div>

      {convertedValue !== null && (
        <div className="result">
          <h3>Converted Value:</h3>
          <p>
            {amount} {fromCurrency} = {convertedValue} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default ConversionCalculator;
