import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  
import '@fortawesome/fontawesome-free/css/all.min.css';  

function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">
        <i className="fas fa-star"></i> Welcome to the Review System!
      </h1>
      <div className="button-container">
        <Link to="/user/1" className="animated-button">
          <i className="fas fa-user"></i> Go to User Profile
        </Link>
        <Link to="/admin" className="animated-button">
          <i className="fas fa-user-shield"></i> Go to Admin Panel
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
