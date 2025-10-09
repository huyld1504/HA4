import React, { useMemo } from 'react';
import FriendCard from '../FriendCard';
import './FriendsList.css';

const FriendsList = ({ searchQuery }) => {
  // Mock data - replace with real data from API
  const friends = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      username: 'nguyen_van_a',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isOnline: true,
      mutualFriends: 12
    },
    {
      id: 2,
      name: 'Trần Thị B',
      username: 'tran_thi_b',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isOnline: false,
      mutualFriends: 8
    },
    {
      id: 3,
      name: 'Lê Văn C',
      username: 'le_van_c',
      avatar: 'https://i.pravatar.cc/150?img=3',
      isOnline: true,
      mutualFriends: 15
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      username: 'pham_thi_d',
      avatar: 'https://i.pravatar.cc/150?img=4',
      isOnline: false,
      mutualFriends: 5
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      username: 'hoang_van_e',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isOnline: true,
      mutualFriends: 20
    },
    {
      id: 6,
      name: 'Vũ Thị F',
      username: 'vu_thi_f',
      avatar: 'https://i.pravatar.cc/150?img=6',
      isOnline: false,
      mutualFriends: 3
    }
  ];

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friends;

    const query = searchQuery.toLowerCase();
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(query) ||
      friend.username.toLowerCase().includes(query)
    );
  }, [searchQuery, friends]);

  if (filteredFriends.length === 0) {
    return (
      <div className="friends-empty">
        <p className="empty-icon">🔍</p>
        <h3 className="empty-title">Không tìm thấy bạn bè</h3>
        <p className="empty-text">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }

  return (
    <div className="friends-list">
      <div className="friends-grid">
        {filteredFriends.map(friend => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
