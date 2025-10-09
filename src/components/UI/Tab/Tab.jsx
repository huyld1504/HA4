import React from 'react';
import PropTypes from 'prop-types';
import './Tab.css';

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const tabsClass = [
    'tabs',
    `tabs-${variant}`,
    fullWidth && 'tabs-full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClass} {...props}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'tab-active' : ''}`}
          onClick={() => onChange(tab.id)}
          disabled={tab.disabled}
        >
          {tab.icon && <span className="tab-icon">{tab.icon}</span>}
          <span className="tab-label">{tab.label}</span>
          {tab.badge && <span className="tab-badge">{tab.badge}</span>}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      badge: PropTypes.node,
      disabled: PropTypes.bool
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['underline', 'pills', 'bordered']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Tabs;
