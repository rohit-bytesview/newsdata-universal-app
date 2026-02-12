import React from 'react';
import './Pagination.css';

const Pagination = ({ onLoadMore, loading, hasMore, currentCount, totalResults }) => {
  if (!hasMore) {
    return null;
  }

  const percentage = totalResults > 0 ? (currentCount / totalResults) * 100 : 0;

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span className="results-count">
          Showing {currentCount.toLocaleString()} of {totalResults.toLocaleString()} articles
        </span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button 
        className={`load-more-btn ${loading ? 'loading' : ''}`}
        onClick={onLoadMore}
        disabled={loading || !hasMore}
      >
        {loading ? (
          <>
            <span className="spinner-small"></span>
            Loading more...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14l-7 7-7-7M12 21V3"/>
            </svg>
            Load More Articles
          </>
        )}
      </button>
    </div>
  );
};

export default Pagination;
