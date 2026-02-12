import React, { useState, useEffect, useCallback } from 'react';
import './NewsPage.css';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import { fetchNews } from '../services/api';

const NewsPage = ({ endpoint, filters, autoRefresh, autoRefreshInterval }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    nextPage: null,
    totalResults: 0
  });
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch news
  const loadNews = useCallback(async (pageToken = null, append = false) => {
    try {
      if (!append) setLoading(true);
      setError(null);

      const params = {
        ...filters,
        page: pageToken
      };

      const data = await fetchNews(endpoint, params);
      
      if (append) {
        setNews(prev => [...prev, ...data.results]);
      } else {
        setNews(data.results);
      }

      setPagination({
        nextPage: data.nextPage || null,
        totalResults: data.totalResults || 0
      });

      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, filters]);

  // Initial load and when filters/endpoint change
  useEffect(() => {
    setNews([]);
    setPagination({ nextPage: null, totalResults: 0 });
    loadNews();
  }, [loadNews]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadNews();
    }, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, autoRefreshInterval, loadNews]);

  // Load more
  const handleLoadMore = () => {
    if (pagination.nextPage && !loading) {
      loadNews(pagination.nextPage, true);
    }
  };

  // Get endpoint title
  const getEndpointTitle = () => {
    const titles = {
      latest: 'Latest News',
      crypto: 'Crypto News',
      market: 'Market News',
      archive: 'News Archive'
    };
    return titles[endpoint] || 'News';
  };

  return (
    <div className="news-page">
      <div className="news-header">
        <div>
          <h2>{getEndpointTitle()}</h2>
          {pagination.totalResults > 0 && (
            <p className="total-results">
              {pagination.totalResults.toLocaleString()} articles found
            </p>
          )}
        </div>
        {lastUpdate && (
          <p className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => loadNews()}>Retry</button>
        </div>
      )}

      {loading && news.length === 0 ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading news...</p>
        </div>
      ) : news.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No news found</h3>
          <p>Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <>
          <div className="news-grid">
            {news.map((article, index) => (
              <NewsCard key={article.article_id || index} article={article} />
            ))}
          </div>

          {pagination.nextPage && (
            <Pagination
              onLoadMore={handleLoadMore}
              loading={loading}
              hasMore={!!pagination.nextPage}
              currentCount={news.length}
              totalResults={pagination.totalResults}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewsPage;
