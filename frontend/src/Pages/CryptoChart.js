import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import './CryptoChart.css';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const timeRanges = [
  { label: "1D", value: "1" },
  { label: "7D", value: "7" },
  { label: "30D", value: "30" },
  { label: "90D", value: "90" },
  { label: "180D", value: "180" },
  { label: "1Y", value: "365" },
];

const CryptoChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState("30");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}`)
      .then((response) => {
        const prices = response.data.prices.map((entry) => ({
          time: new Date(entry[0]).toLocaleDateString(),
          price: entry[1],
        }));

        setChartData({
          labels: prices.map((data) => data.time),
          datasets: [
            {
              label: `Price (USD) - Last ${selectedRange} Days`,
              data: prices.map((data) => data.price),
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              tension: 0.3,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#4CAF50",
            },
          ],
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      });
  }, [coinId, selectedRange]);

  return (
    <div style={{ width: "90%", maxWidth: "1000px", margin: "auto", padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {timeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => setSelectedRange(range.value)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              borderRadius: "20px",
              border: selectedRange === range.value ? "2px solid #4CAF50" : "1px solid gray",
              backgroundColor: selectedRange === range.value ? "#4CAF50" : "#f5f5f5",
              color: selectedRange === range.value ? "white" : "#333",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
          >
            {range.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Loading chart...</p>
      ) : (
        <div style={{ height: "400px", position: "relative" }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "index",
                intersect: false,
              },
              plugins: {
                tooltip: {
                  backgroundColor: "#fff",
                  borderColor: "#4CAF50",
                  borderWidth: 1,
                  titleColor: "#4CAF50",
                  bodyColor: "#333",
                  callbacks: {
                    label: (tooltipItem) => `$${tooltipItem.raw.toLocaleString()}`,
                  },
                },
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                    color: "#333",
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    borderColor: "#ddd",
                    color: "#f0f0f0",
                  },
                  ticks: {
                    color: "#333",
                    font: {
                      size: 12,
                    },
                  },
                },
                y: {
                  grid: {
                    borderColor: "#ddd",
                    color: "#f0f0f0",
                  },
                  ticks: {
                    color: "#333",
                    font: {
                      size: 12,
                    },
                    callback: function (value) {
                      return `$${value.toLocaleString()}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CryptoChart;
