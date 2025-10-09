import React from 'react';
import './MemberBadges.css';

const MemberBadges = ({ badges = [] }) => {
  // Default badges nếu không truyền vào
  const defaultBadges = [
    {
      id: 1,
      name: 'Hỗ trợ sinh',
      icon: '🎓',
      color: '#4CAF50',
      description: 'Thành viên hỗ trợ sinh viên'
    },
    {
      id: 2,
      name: 'Thành viên vàng',
      icon: '👑',
      color: '#FFD700',
      description: 'Thành viên VIP vàng'
    },
    {
      id: 3,
      name: 'Nhà bảo trợ nghệ thuật',
      icon: '🎨',
      color: '#9C27B0',
      description: 'Người bảo trợ các dự án nghệ thuật'
    }
  ];

  const displayBadges = badges.length > 0 ? badges : defaultBadges;

  if (displayBadges.length === 0) return null;

  return (
    <div className="member-badges">
      <h4 className="badges-title">🏆 Huy hiệu</h4>
      <div className="badges-list">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="badge-item"
            style={{ '--badge-color': badge.color }}
            title={badge.description}
          >
            <span className="badge-icon">{badge.icon}</span>
            <span className="badge-name">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberBadges;
