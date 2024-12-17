import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faSave, faUsers, faComments, faHeart, faBrain, faMale, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './SidebarNavigation.css';

function SidebarNavigation() {
  return (
    <div className="sidebar">
      <ul>
        <li className="nav-item">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <span>Home</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
          <span>Questions</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faSave} className="icon" />
          <span>Save</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <span>Users</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faComments} className="icon" />
          <span>Forum</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faHeart} className="icon" />
          <span>L'Amour</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faBrain} className="icon" />
          <span>La santé Mentale</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faMale} className="icon" />
          <span>La Sexualité sans Tabous</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faHandshake} className="icon" />
          <span>Relation et Vie Sociale</span>
        </li>
      </ul>
    </div>
  );
}

export default SidebarNavigation;
