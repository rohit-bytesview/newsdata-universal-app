<img width="1835" height="965" alt="image (3)" src="https://github.com/user-attachments/assets/2516c146-0b37-466c-99e6-aa1d16ed721c" />

# 📰 NewsData Universal App

A comprehensive news aggregator built with React.js and NewsData.io API. Browse **Latest**, **Crypto**, **Market**, and **Archive** news with advanced filtering by country, category, and language.

## ✨ Features

- **4 News Endpoints**: Latest, Crypto, Market, Archive
- **Advanced Filters**: Category, Country, Language, Search
- **Auto-refresh**: Updates every 60 seconds (toggleable)
- **Pagination**: Load more with seamless scrolling
- **Responsive Design**: Works on desktop, tablet, mobile
- **Clean UI**: Modern, intuitive interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# 1. Extract and navigate
cd newsdata-universal-app

# 2. Install dependencies
npm install

# 3. Configure API key
cp .env.example .env
nano .env
# Add: REACT_APP_NEWSDATA_API_KEY=your_key_here

# 4. Start the app
npm start
```

The app opens at `http://localhost:3000`

## 📖 Usage

### Get Your API Key
1. Visit https://newsdata.io/register
2. Sign up (free tier available)
3. Copy your API key
4. Add to `.env` file

### Navigation
- **📰 Latest News**: General news from all categories
- **₿ Crypto News**: Cryptocurrency-specific news
- **📈 Market News**: Financial market news
- **📚 Archive**: Historical news search

### Filters
- **Search**: Find specific topics
- **Category**: Business, Tech, Sports, etc.
- **Country**: 30+ countries available
- **Language**: 15+ languages supported

## 🎯 Real-World Use Cases

Perfect for:
- **News Junkies**: All news in one place
- **Researchers**: Quick country/category filtering
- **Professionals**: Business + Crypto news together
- **Students**: Current affairs preparation
- **Content Creators**: Find trending topics

## 🛠️ Tech Stack

- React 18
- React Router 6
- Axios
- CSS3
- NewsData.io API

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js         # Top navigation
│   ├── Sidebar.js        # Filters & endpoints
│   ├── NewsCard.js       # Article display
│   └── Pagination.js     # Load more
├── pages/
│   └── NewsPage.js       # Main news view
├── services/
│   └── api.js            # API integration
├── constants/
│   └── index.js          # Categories, countries
└── App.js                # Main component
```

## 🔧 Configuration

### Environment Variables

```env
REACT_APP_NEWSDATA_API_KEY=your_key
REACT_APP_NEWSDATA_BASE_URL=https://newsdata.io/api/1
REACT_APP_AUTO_REFRESH_INTERVAL=60
```

## 📱 Screenshots

[Add screenshots here]

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 📄 License

MIT License - see LICENSE file

## 🔗 Links

- [NewsData.io API Docs](https://newsdata.io/documentation)
- [React Documentation](https://react.dev)
- [Report Issues](https://github.com/your-repo/issues)

---

**Made with ❤️ using NewsData.io API**
