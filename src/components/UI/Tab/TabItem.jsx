import React from 'react';
import PropTypes from 'prop-types';
import './Tab.css';

const Tab = ({
  children,
  active = false,
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const tabClass = [
    'tab-item',
    active && 'tab-active',
    disabled && 'tab-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={tabClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default Tab;
