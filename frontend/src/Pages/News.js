import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.css";

function News() {
  const [news, setNews] = useState([]); // NewsAPI articles
  const [loading, setLoading] = useState(true);
  const [latestHeadlines, setLatestHeadlines] = useState([]); // Mediastack headlines

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch news from Mediastack
        const newsResponse = await axios.get(
          `https://api.mediastack.com/v1/news?access_key=912a03f4051de4107730d43f26057ed7&categories=business&languages=en`
        );
        
        // Set the news for the ticker
        const headlines = newsResponse.data.data.map((article) => article.title);
        setLatestHeadlines(headlines);
        
        // Fetch more detailed news (if needed)
        setNews(newsResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news from Mediastack:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading news...</p>;
  }

  return (
    <div className="news-container">
      {/* News Ticker */}
      {latestHeadlines.length > 0 && (
        <div className="news-ticker">
          <div className="ticker-content">
            {latestHeadlines.map((headline, index) => (
              <span key={index} className="ticker-item">
                {headline} •  
              </span>
            ))}
          </div>
        </div>
      )}

      <h2>Crypto News</h2>
      {news.length === 0 ? (
        <p>No news available at the moment.</p>
      ) : (
        <ul className="news-list">
          {news.map((article, index) => (
            <li key={index} className="news-item">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default News;
