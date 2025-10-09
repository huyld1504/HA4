import React from 'react';
import { Card } from '../../../../components/UI';
import MemberBadges from './MemberBadges';
import './ProfileInfo.css';

const ProfileInfo = () => {
  const userInfo = {
    bio: 'professional basketball player ',
    location: 'Hồ Chí Minh, Việt Nam',
    joinDate: 'Tham gia tháng 1 năm 2024',
    stats: {
      posts: 156,
      followers: 1234,
      following: 567
    }
  };

  // Huy hiệu của member
  const memberBadges = [
    {
      id: 1,
      name: 'Thành viên vàng',
      icon: '👑',
      color: '#FFD700',
      description: 'Thành viên VIP vàng'
    }
  ];

  return (
    <div className="profile-info">
      <Card className="profile-info-card">
        <h3 className="info-title">Giới thiệu</h3>

        <div className="info-section">
          <p className="bio">{userInfo.bio}</p>
        </div>

        <div className="info-section">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span className="info-text">{userInfo.location}</span>
          </div>

          <div className="info-item">
            <span className="info-icon">📅</span>
            <span className="info-text">{userInfo.joinDate}</span>
          </div>
        </div>

        <div className="info-stats">
          <div className="stat-item">
            <span className="stat-value">{userInfo.stats.posts}</span>
            <span className="stat-label">Bài viết</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userInfo.stats.followers}</span>
            <span className="stat-label">Người theo dõi</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userInfo.stats.following}</span>
            <span className="stat-label">Đang theo dõi</span>
          </div>
        </div>

        {/* Member Badges */}
        <MemberBadges badges={memberBadges} />
      </Card>
    </div>
  );
};

export default ProfileInfo;
