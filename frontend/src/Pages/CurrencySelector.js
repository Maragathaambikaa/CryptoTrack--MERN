import React, { useState } from 'react';

function CurrencySelector({ onCurrencyChange }) {
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default to USD
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD']; // Add more currencies as needed

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
    onCurrencyChange(e.target.value); // Pass selected currency to parent component
  };

  return (
    <div>
      <label htmlFor="currency-selector">Select Currency: </label>
      <select
        id="currency-selector"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;
