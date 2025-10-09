import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.css';

const SearchInput = ({ 
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  onSearch,
  disabled = false,
  className = '',
  ...props 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`search-input-wrapper ${className}`}>
      <span className="search-input-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="search-input-field"
        {...props}
      />
      {value && (
        <button 
          className="search-input-clear"
          onClick={() => onChange('')}
          type="button"
        >
          ✕
        </button>
      )}
      {onSearch && (
        <button 
          className="search-input-button"
          onClick={() => onSearch(value)}
          type="button"
          disabled={disabled}
        >
          Tìm
        </button>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default SearchInput;
