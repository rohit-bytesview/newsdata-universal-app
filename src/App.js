import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NewsPage from './pages/NewsPage';
import { fetchNews } from './services/api';
import { ENDPOINTS } from './constants';

function App() {
  const [activeEndpoint, setActiveEndpoint] = useState(ENDPOINTS.LATEST);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [filters, setFilters] = useState({
    category: '',
    country: '',
    language: 'en',
    q: ''
  });
  const [autoRefresh, setAutoRefresh] = useState(true);
  const AUTO_REFRESH_INTERVAL = (process.env.REACT_APP_AUTO_REFRESH_INTERVAL || 60) * 1000;

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Change endpoint
  const handleEndpointChange = (endpoint) => {
    setActiveEndpoint(endpoint);
    // Reset certain filters when changing endpoints
    if (endpoint === ENDPOINTS.CRYPTO || endpoint === ENDPOINTS.MARKET) {
      setFilters(prev => ({ ...prev, category: '' }));
    }
  };

  return (
    <Router>
      <div className="App">
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
        />
        
        <div className="app-container">
          <Sidebar 
            isOpen={sidebarOpen}
            activeEndpoint={activeEndpoint}
            onEndpointChange={handleEndpointChange}
            filters={filters}
            setFilters={setFilters}
          />
          
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <NewsPage 
                    endpoint={activeEndpoint}
                    filters={filters}
                    autoRefresh={autoRefresh}
                    autoRefreshInterval={AUTO_REFRESH_INTERVAL}
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
