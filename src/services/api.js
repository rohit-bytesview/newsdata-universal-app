import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;
const BASE_URL = process.env.REACT_APP_NEWSDATA_BASE_URL || 'https://newsdata.io/api/1';

if (!API_KEY) {
  console.warn('⚠️ NewsData.io API key not found. Please set REACT_APP_NEWSDATA_API_KEY in .env file');
}

/**
 * Fetch news from any NewsData.io endpoint
 * @param {string} endpoint - 'latest', 'crypto', 'market', or 'archive'
 * @param {Object} params - Query parameters
 * @returns {Promise} News data
 */
export const fetchNews = async (endpoint = 'latest', params = {}) => {
  try {
    const queryParams = {
      apikey: API_KEY,
      ...params
    };

    // Remove empty/null params
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === undefined) {
        delete queryParams[key];
      }
    });

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: queryParams
    });

    if (response.data.status !== 'success') {
      throw new Error(response.data.results?.message || 'Failed to fetch news');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data.results?.message || 
                      error.response.data.message ||
                      `API Error: ${error.response.status}`;
      throw new Error(errorMsg);
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch news');
    }
  }
};

/**
 * Fetch latest news
 */
export const fetchLatestNews = (params) => fetchNews('latest', params);

/**
 * Fetch crypto news
 */
export const fetchCryptoNews = (params) => fetchNews('crypto', params);

/**
 * Fetch market news
 */
export const fetchMarketNews = (params) => fetchNews('market', params);

/**
 * Fetch archive news
 */
export const fetchArchiveNews = (params) => fetchNews('archive', params);
