import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../../../../constants';
import AccountDropdown from '../../AccountDropdown';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">
              <span className="logo-text">MT4🔧</span>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="navbar-menu">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${isActive(item.path) ? 'menu-item-active' : ''}`}
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to={item.path} className="menu-link">
                {item.label}
                {item.hasDropdown && <span className="menu-arrow">▼</span>}
              </Link>

              {item.hasDropdown && activeDropdown === item.label && (
                <div className="dropdown-submenu">
                  {/* Submenu items can be added here */}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Account Dropdown */}
        <AccountDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
