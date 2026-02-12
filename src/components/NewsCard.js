import React from 'react';
import './NewsCard.css';
import { formatDistanceToNow, parseISO } from 'date-fns';

const NewsCard = ({ article }) => {
  const {
    title,
    description,
    link,
    pubDate,
    source_id,
    image_url,
    category,
    country,
    creator
  } = article;

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const getCategoryColor = (cat) => {
    const colors = {
      business: '#3b82f6',
      technology: '#8b5cf6',
      sports: '#10b981',
      entertainment: '#f59e0b',
      health: '#ef4444',
      science: '#06b6d4',
      politics: '#6366f1',
      world: '#14b8a6'
    };
    return colors[cat] || '#64748b';
  };

  return (
    <article className="news-card">
      {image_url && (
        <div className="news-card-image">
          <img src={image_url} alt={title} loading="lazy" />
          {category && category[0] && (
            <div 
              className="category-badge"
              style={{ background: getCategoryColor(category[0]) }}
            >
              {category[0]}
            </div>
          )}
        </div>
      )}

      <div className="news-card-content">
        <div className="news-card-header">
          <span className="news-source">{source_id || 'Unknown'}</span>
          <span className="news-date">{formatDate(pubDate)}</span>
        </div>

        <h3 className="news-title">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>

        {description && (
          <p className="news-description">
            {description.substring(0, 150)}
            {description.length > 150 ? '...' : ''}
          </p>
        )}

        <div className="news-card-footer">
          {creator && creator.length > 0 && (
            <span className="news-author">
              By {creator[0]}
            </span>
          )}
          {country && country.length > 0 && (
            <span className="news-country">
              {country[0].toUpperCase()}
            </span>
          )}
        </div>

        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="read-more-btn"
        >
          Read Full Article →
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
