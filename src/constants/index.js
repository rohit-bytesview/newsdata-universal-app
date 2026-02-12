// Available news categories from NewsData.io API
export const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'business', label: '💼 Business' },
  { value: 'crime', label: '🚔 Crime' },
  { value: 'domestic', label: '🏠 Domestic' },
  { value: 'education', label: '🎓 Education' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'environment', label: '🌍 Environment' },
  { value: 'food', label: '🍔 Food' },
  { value: 'health', label: '⚕️ Health' },
  { value: 'lifestyle', label: '✨ Lifestyle' },
  { value: 'other', label: '📰 Other' },
  { value: 'politics', label: '🏛️ Politics' },
  { value: 'science', label: '🔬 Science' },
  { value: 'sports', label: '⚽ Sports' },
  { value: 'technology', label: '💻 Technology' },
  { value: 'top', label: '🔥 Top Stories' },
  { value: 'tourism', label: '✈️ Tourism' },
  { value: 'world', label: '🌎 World' }
];

// Available countries from NewsData.io API
export const COUNTRIES = [
  { value: '', label: 'All Countries' },
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'gb', label: '🇬🇧 United Kingdom' },
  { value: 'ca', label: '🇨🇦 Canada' },
  { value: 'au', label: '🇦🇺 Australia' },
  { value: 'in', label: '🇮🇳 India' },
  { value: 'ae', label: '🇦🇪 UAE' },
  { value: 'sa', label: '🇸🇦 Saudi Arabia' },
  { value: 'jp', label: '🇯🇵 Japan' },
  { value: 'cn', label: '🇨🇳 China' },
  { value: 'kr', label: '🇰🇷 South Korea' },
  { value: 'sg', label: '🇸🇬 Singapore' },
  { value: 'de', label: '🇩🇪 Germany' },
  { value: 'fr', label: '🇫🇷 France' },
  { value: 'it', label: '🇮🇹 Italy' },
  { value: 'es', label: '🇪🇸 Spain' },
  { value: 'nl', label: '🇳🇱 Netherlands' },
  { value: 'br', label: '🇧🇷 Brazil' },
  { value: 'mx', label: '🇲🇽 Mexico' },
  { value: 'ar', label: '🇦🇷 Argentina' },
  { value: 'za', label: '🇿🇦 South Africa' },
  { value: 'ng', label: '🇳🇬 Nigeria' },
  { value: 'eg', label: '🇪🇬 Egypt' },
  { value: 'ru', label: '🇷🇺 Russia' },
  { value: 'tr', label: '🇹🇷 Turkey' },
  { value: 'pk', label: '🇵🇰 Pakistan' },
  { value: 'bd', label: '🇧🇩 Bangladesh' },
  { value: 'id', label: '🇮🇩 Indonesia' },
  { value: 'my', label: '🇲🇾 Malaysia' },
  { value: 'th', label: '🇹🇭 Thailand' },
  { value: 'ph', label: '🇵🇭 Philippines' },
  { value: 'vn', label: '🇻🇳 Vietnam' }
];

// Available languages
export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ru', label: 'Russian' },
  { value: 'tr', label: 'Turkish' },
  { value: 'nl', label: 'Dutch' },
  { value: 'sv', label: 'Swedish' }
];

// News endpoints
export const ENDPOINTS = {
  LATEST: 'latest',
  CRYPTO: 'crypto',
  MARKET: 'market',
  ARCHIVE: 'archive'
};
