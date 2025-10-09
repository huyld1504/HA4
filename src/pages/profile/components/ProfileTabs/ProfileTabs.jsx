import React, { useState } from 'react';
import { Card } from '../../../../components/UI';
import './ProfileTabs.css';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: '📝 Bài viết', count: 156 },
    { id: 'media', label: '📷 Ảnh & Video', count: 89 },
    { id: 'liked', label: '❤️ Đã thích', count: 234 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsContent />;
      case 'media':
        return <MediaContent />;
      case 'liked':
        return <LikedContent />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-tabs">
      <Card>
        <div className="tabs-header">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="tabs-content">
          {renderContent()}
        </div>
      </Card>
    </div>
  );
};

// Temporary content components
const PostsContent = () => (
  <div className="content-placeholder">
    <p>📝 Danh sách bài viết sẽ hiển thị tại đây</p>
  </div>
);

const MediaContent = () => (
  <div className="content-placeholder">
    <p>📷 Thư viện ảnh & video sẽ hiển thị tại đây</p>
  </div>
);

const LikedContent = () => (
  <div className="content-placeholder">
    <p>❤️ Các bài viết đã thích sẽ hiển thị tại đây</p>
  </div>
);

export default ProfileTabs;
