import React from 'react';
import { ProfileHeader, ProfileTabs, ProfileInfo } from './components';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <ProfileHeader />
        <div className="profile-content">
          <ProfileInfo />
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
};

export default Profile;
