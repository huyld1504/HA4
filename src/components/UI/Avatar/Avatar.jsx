import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';

const Avatar = ({ 
  src, 
  alt = 'Avatar',
  size = 'medium',
  online = false,
  badge,
  fallback,
  onClick,
  className = '',
  ...props 
}) => {
  const avatarClass = [
    'avatar',
    `avatar-${size}`,
    onClick && 'avatar-clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={avatarClass} onClick={onClick} {...props}>
      {src ? (
        <img src={src} alt={alt} className="avatar-image" />
      ) : (
        <div className="avatar-fallback">
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
      
      {online && <span className="avatar-online-indicator"></span>}
      {badge && <span className="avatar-badge">{badge}</span>}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  online: PropTypes.bool,
  badge: PropTypes.node,
  fallback: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Avatar;
