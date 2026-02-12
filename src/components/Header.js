import React from 'react';
import './Header.css';

const Header = ({ toggleSidebar, sidebarOpen, autoRefresh, setAutoRefresh }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 12h16M8 16h12M8 20h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1>NewsData Universal</h1>
          </div>
        </div>

        <div className="header-right">
          <div className="auto-refresh-toggle">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">Auto-refresh</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
