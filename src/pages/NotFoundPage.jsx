import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; 

function NotFoundPage() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
