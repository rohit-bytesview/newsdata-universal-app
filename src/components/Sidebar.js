import React from 'react';
import './Sidebar.css';
import { ENDPOINTS, CATEGORIES, COUNTRIES, LANGUAGES } from '../constants';

const Sidebar = ({ isOpen, activeEndpoint, onEndpointChange, filters, setFilters }) => {
  const endpoints = [
    { key: ENDPOINTS.LATEST, label: '📰 Latest News', icon: '📰' },
    { key: ENDPOINTS.CRYPTO, label: '₿ Crypto News', icon: '₿' },
    { key: ENDPOINTS.MARKET, label: '📈 Market News', icon: '📈' },
    { key: ENDPOINTS.ARCHIVE, label: '📚 Archive', icon: '📚' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
            <div className="filter-group">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search keywords..."
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                className="filter-input"
              />
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
