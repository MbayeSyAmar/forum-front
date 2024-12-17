import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="logo">
      <img src="/logo 1.png" alt="Logo" />
        <span className="logo-text">Family Horizon</span>
      </div>
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Search" />
        <button className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="auth-buttons">
        <button className="login-button">Log in</button>
        <button className="signup-button">Sign up</button>
      </div>
    </div>
  );
}

export default Header;
