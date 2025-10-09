import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Badge } from '../../../../components/UI';
import './FriendCard.css';

const FriendCard = ({ friend }) => {
  const handleMessage = (e) => {
    e.preventDefault();
    console.log('Send message to', friend.name);
  };

  const handleUnfriend = (e) => {
    e.preventDefault();
    console.log('Unfriend', friend.name);
  };

  return (
    <Link to={`/profile/${friend.id}`} className="friend-card">
      <div className="friend-card-header">
        <div className="friend-avatar-wrapper">
          <Avatar
            src={friend.avatar}
            alt={friend.name}
            size="lg"
          />
          {friend.isOnline && (
            <Badge variant="success" className="online-badge">
              Online
            </Badge>
          )}
        </div>
      </div>

      <div className="friend-card-body">
        <h3 className="friend-name">{friend.name}</h3>
        <p className="friend-username">@{friend.username}</p>

        {friend.mutualFriends > 0 && (
          <p className="mutual-friends">
            👥 {friend.mutualFriends} bạn chung
          </p>
        )}
      </div>

      <div className="friend-card-actions">
        <Button
          variant="primary"
          size="sm"
          onClick={handleMessage}
        >
          💬 Nhắn tin
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleUnfriend}
        >
          ❌ Hủy kết bạn
        </Button>
      </div>
    </Link>
  );
};

export default FriendCard;
