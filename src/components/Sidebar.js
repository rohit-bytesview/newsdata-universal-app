import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import { ENDPOINTS, CATEGORIES, COUNTRIES, LANGUAGES } from '../constants';
import useDebounce from '../hooks/useDebounce';

const SEARCH_HISTORY_KEY = 'newsapp_search_history';
const SEARCH_HISTORY_LIMIT = 8;

const loadSearchHistory = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const Sidebar = ({ isOpen, activeEndpoint, onEndpointChange, filters, setFilters }) => {
  const endpoints = [
    { key: ENDPOINTS.LATEST, label: '📰 Latest News', icon: '📰' },
    { key: ENDPOINTS.CRYPTO, label: '₿ Crypto News', icon: '₿' },
    { key: ENDPOINTS.MARKET, label: '📈 Market News', icon: '📈' },
    { key: ENDPOINTS.ARCHIVE, label: '📚 Archive', icon: '📚' }
  ];

  // Local input value drives the box instantly; the debounced copy is what
  // actually commits to filters.q (and triggers a fetch in NewsPage).
  const [searchInput, setSearchInput] = useState(filters.q);
  const [history, setHistory] = useState(loadSearchHistory);
  const [showHistory, setShowHistory] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 500);
  const searchRef = useRef(null);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Commit the debounced search term to global filters.
  useEffect(() => {
    if (debouncedSearch !== filters.q) {
      handleFilterChange('q', debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Keep the local box in sync when filters.q is reset elsewhere (e.g. Clear).
  useEffect(() => {
    setSearchInput(filters.q);
  }, [filters.q]);

  // Persist search history to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  // Close the history dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToHistory = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistory(prev => [
      trimmed,
      ...prev.filter(t => t.toLowerCase() !== trimmed.toLowerCase())
    ].slice(0, SEARCH_HISTORY_LIMIT));
  };

  const applyHistoryTerm = (term) => {
    setSearchInput(term);
    handleFilterChange('q', term);
    saveToHistory(term);
    setShowHistory(false);
  };

  const removeHistoryTerm = (term) => {
    setHistory(prev => prev.filter(t => t !== term));
  };

  const clearHistory = () => setHistory([]);

  const clearFilters = () => {
    setFilters({
      category: '',
      country: '',
      language: 'en',
      q: ''
    });
  };

  const hasActiveFilters = filters.category || filters.country || filters.q || filters.language !== 'en';

  // Category filter is not available for crypto and market endpoints
  const showCategoryFilter = activeEndpoint !== ENDPOINTS.CRYPTO && activeEndpoint !== ENDPOINTS.MARKET;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => {}} />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Endpoints */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">News Sources</h3>
            <nav className="endpoint-nav">
              {endpoints.map(endpoint => (
                <button
                  key={endpoint.key}
                  className={`endpoint-btn ${activeEndpoint === endpoint.key ? 'active' : ''}`}
                  onClick={() => onEndpointChange(endpoint.key)}
                >
                  <span className="endpoint-icon">{endpoint.icon}</span>
                  <span className="endpoint-label">{endpoint.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Filters */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3 className="sidebar-title">Filters</h3>
              {hasActiveFilters && (
                <button className="clear-btn" onClick={clearFilters}>
                  Clear
                </button>
              )}
            </div>

            {/* Search */}
            <div className="filter-group" ref={searchRef}>
              <label htmlFor="search">Search</label>
              <div className="search-wrapper">
                <input
                  id="search"
                  type="text"
                  placeholder="Search keywords..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setShowHistory(true)}
                  onBlur={() => saveToHistory(searchInput)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveToHistory(searchInput);
                      setShowHistory(false);
                    }
                  }}
                  className="filter-input"
                  autoComplete="off"
                />

                {showHistory && history.length > 0 && (
                  <div className="search-history">
                    <div className="search-history-header">
                      <span>Recent searches</span>
                      <button
                        type="button"
                        className="history-clear"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={clearHistory}
                      >
                        Clear all
                      </button>
                    </div>
                    {history.map(term => (
                      <div key={term} className="history-item">
                        <button
                          type="button"
                          className="history-term"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => applyHistoryTerm(term)}
                        >
                          🕘 {term}
                        </button>
                        <button
                          type="button"
                          className="history-remove"
                          aria-label={`Remove ${term}`}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => removeHistoryTerm(term)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            {showCategoryFilter && (
              <div className="filter-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="filter-select"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Country */}
            <div className="filter-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="filter-select"
              >
                {COUNTRIES.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="filter-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="filter-select"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="sidebar-footer">
            <p>Powered by <a href="https://newsdata.io" target="_blank" rel="noopener noreferrer">NewsData.io</a></p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
