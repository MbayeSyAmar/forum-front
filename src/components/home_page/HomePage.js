import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import './home.css';

function HomePage() {
  return (
    
    <div className="homepage">
        <Sidebar />
        <div className="main-container">
        <Header />
        <MainContent />
      </div>
     
      
    </div>
  );
}

export default HomePage;
