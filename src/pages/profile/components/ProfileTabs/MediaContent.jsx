import React, { useState } from 'react';
import './MediaContent.css';

const MediaContent = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://picsum.photos/400/400?random=1',
      caption: 'Beautiful sunset',
      likes: 145,
      date: '2024-10-05'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://picsum.photos/400/400?random=2',
      thumbnail: 'https://picsum.photos/400/400?random=2',
      caption: 'Coding tutorial',
      likes: 234,
      duration: '5:32',
      date: '2024-10-03'
    },
    {
      id: 3,
      type: 'image',
      url: 'https://picsum.photos/400/400?random=3',
      caption: 'Team building event',
      likes: 189,
      date: '2024-09-28'
    },
    {
      id: 4,
      type: 'image',
      url: 'https://picsum.photos/400/400?random=4',
      caption: 'Office workspace',
      likes: 156,
      date: '2024-09-25'
    },
    {
      id: 5,
      type: 'video',
      url: 'https://picsum.photos/400/400?random=5',
      thumbnail: 'https://picsum.photos/400/400?random=5',
      caption: 'Product demo',
      likes: 278,
      duration: '3:45',
      date: '2024-09-20'
    },
    {
      id: 6,
      type: 'image',
      url: 'https://picsum.photos/400/400?random=6',
      caption: 'Conference day',
      likes: 201,
      date: '2024-09-15'
    },
    {
      id: 7,
      type: 'image',
      url: 'https://picsum.photos/400/400?random=7',
      caption: 'Creative work',
      likes: 167,
      date: '2024-09-10'
    },
    {
      id: 8,
      type: 'video',
      url: 'https://picsum.photos/400/400?random=8',
      thumbnail: 'https://picsum.photos/400/400?random=8',
      caption: 'Behind the scenes',
      likes: 312,
      duration: '7:20',
      date: '2024-09-05'
    }
  ];

  const filteredMedia = activeFilter === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.type === activeFilter);

  return (
    <div className="media-content">
      <div className="media-filters">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          📁 Tất cả ({mediaItems.length})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'image' ? 'active' : ''}`}
          onClick={() => setActiveFilter('image')}
        >
          🖼️ Ảnh ({mediaItems.filter(i => i.type === 'image').length})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'video' ? 'active' : ''}`}
          onClick={() => setActiveFilter('video')}
        >
          🎥 Video ({mediaItems.filter(i => i.type === 'video').length})
        </button>
      </div>

      <div className="media-grid">
        {filteredMedia.map(item => (
          <div key={item.id} className="media-item">
            <div className="media-thumbnail">
              <img
                src={item.type === 'video' ? item.thumbnail : item.url}
                alt={item.caption}
              />
              {item.type === 'video' && (
                <div className="video-overlay">
                  <span className="play-icon">▶️</span>
                  <span className="video-duration">{item.duration}</span>
                </div>
              )}
            </div>
            <div className="media-info">
              <p className="media-caption">{item.caption}</p>
              <div className="media-stats">
                <span className="media-likes">❤️ {item.likes}</span>
                <span className="media-date">{new Date(item.date).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="media-empty">
          <p className="empty-icon">📷</p>
          <h3>Chưa có nội dung</h3>
          <p>Chưa có {activeFilter === 'image' ? 'ảnh' : 'video'} nào được đăng</p>
        </div>
      )}
    </div>
  );
};

export default MediaContent;
