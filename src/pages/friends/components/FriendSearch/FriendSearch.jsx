import React from 'react';
import { SearchInput, Button } from '../../../../components/UI';
import './FriendSearch.css';

const FriendSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="friend-search">
      <div className="search-container">
        <SearchInput
          placeholder="Tìm kiếm bạn bè..."
          value={searchQuery}
          onChange={onSearchChange}
        />

        <div className="search-filters">
          <Button variant="secondary" size="sm">
            🎯 Tất cả
          </Button>
          <Button variant="secondary" size="sm">
            🟢 Online
          </Button>
          <Button variant="secondary" size="sm">
            📅 Mới nhất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendSearch;
