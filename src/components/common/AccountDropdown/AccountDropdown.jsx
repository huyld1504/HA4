import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ACCOUNT_MENU_ITEMS } from '../../../constants';
import './AccountDropdown.css';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    setIsOpen(false);
    navigate('/login');
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="account-dropdown" ref={dropdownRef}>
      <button
        className="account-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="trigger-text">Tài khoản & Hỗ trợ</span>
        <span className={`trigger-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="account-menu">
          <div className="account-menu-items">
            {ACCOUNT_MENU_ITEMS.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="account-menu-item"
                onClick={handleMenuClick}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-label">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="account-menu-divider"></div>

          <button
            className="account-menu-item account-logout"
            onClick={handleLogout}
          >
            <span className="item-icon">🚪</span>
            <span className="item-label">Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
