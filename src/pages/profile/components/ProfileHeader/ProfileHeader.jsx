import React from 'react';
import { Avatar, Button } from '../../../../components/UI';
import './ProfileHeader.css';

const ProfileHeader = () => {
  const user = {
    name: 'stephen curry',
    username: '@stephen_curry',
    avatar: 'https://tse2.mm.bing.net/th/id/OIP.SGIaA7xMaaCZ7o1PO2mSiwHaHZ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    coverImage: 'https://tse2.mm.bing.net/th/id/OIP.6ADy3MjefCyG_6pYZkF8rgHaEo?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3'
  };

  return (
    <div className="profile-header">
      <div className="profile-cover">
        <img src={user.coverImage} alt="Cover" className="cover-image" />
        <button className="edit-cover-btn">
          📷 Chỉnh sửa ảnh bìa
        </button>
      </div>

      <div className="profile-header-content">
        <div className="profile-avatar-section">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="xl"
            className="profile-avatar"
          />
          <button className="edit-avatar-btn">📷</button>
        </div>

        <div className="profile-info-section">
          <div className="profile-user-info">
            <div className="profile-name-wrapper">
              <h1 className="profile-name">{user.name}</h1>
              <div className="profile-badges-inline">
                <span className="badge-mini" title="Thành viên vàng">👑</span>
               
              </div>
            </div>
            <p className="profile-username">{user.username}</p>
          </div>

          <div className="profile-actions">
            <Button variant="primary">
              ✏️ Chỉnh sửa trang cá nhân
            </Button>
            <Button variant="secondary">
              ⚙️ Cài đặt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
