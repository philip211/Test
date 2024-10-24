import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  
import './AdminPanel.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function AdminPanel() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGridView, setIsGridView] = useState(false);  // Toggle between grid and column view
  const [sortOrder, setSortOrder] = useState('none');  // Sorting state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetching reviews
        const response = await axios.get('http://localhost:3000/reviews');
        setReviews(response.data);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const deleteReview = async (reviewId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (!confirmDelete) return;

    try {
      // Deleting review
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`);
      
      // Update state after deletion
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      setError('Failed to delete the review. Please try again later.');
      console.error(err);
    }
  };

  // Toggle between grid and column views
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Sort reviews by rating
  const sortReviews = (order) => {
    if (order === 'asc') {
      setReviews((prevReviews) => [...prevReviews].sort((a, b) => a.rating - b.rating));
    } else if (order === 'desc') {
      setReviews((prevReviews) => [...prevReviews].sort((a, b) => b.rating - a.rating));
    }
    setSortOrder(order);
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="admin-panel-container">
      <h1>
        <i className="fas fa-user-shield"></i> Admin Panel
      </h1>

      {/* Sorting options */}
      <div className="sort-options">
        <button onClick={() => sortReviews('asc')}>
          Sort by Rating: Ascending
        </button>
        <button onClick={() => sortReviews('desc')}>
          Sort by Rating: Descending
        </button>
      </div>

      {/* Toggle layout button */}
      <button onClick={toggleView} className="toggle-view-button">
        {isGridView ? 'Switch to Column View' : 'Switch to Grid View'}
      </button>

      {/* Display reviews */}
      <div className={`reviews-container ${isGridView ? 'grid-view' : 'column-view'}`}>
        {reviews.length === 0 ? (
          <p>No reviews to display.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p>{review.text}</p>
              <p>
                <i className="fas fa-star"></i> Rating: {review.rating} stars
              </p>
              <button onClick={() => deleteReview(review.id)} className="delete-button">
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Back to main page button */}
      <Link to="/" className="back-button">
        <i className="fas fa-arrow-left"></i> Back to main page
      </Link>
    </div>
  );
}

export default AdminPanel;
