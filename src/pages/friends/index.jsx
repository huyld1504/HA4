import React, { useState } from 'react';
import { FriendsList, FriendSearch } from './components';
import './Friends.css';

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="friends-page">
      <div className="friends-container">
        <div className="friends-header">
          <h1 className="friends-title">👥 Bạn bè</h1>
          <p className="friends-subtitle">Quản lý danh sách bạn bè của bạn</p>
        </div>

        <FriendSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FriendsList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Friends;
