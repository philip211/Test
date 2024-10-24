import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';
import ReviewForm from './ReviewForm';
import Review from './Review';
import AverageRating from './AverageRating';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function UserProfile({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);      
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews?revieweeId=${userId}`);
        setReviews(response.data);
        calculateAverageRating(response.data);
      } catch (err) {
        setError('Error loading reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalStars = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
    const avg = totalStars / reviews.length;
    setAverageRating(avg.toFixed(1));  
  };

  const handleNewReview = (newReview) => {
    setReviews([...reviews, newReview]);  
    calculateAverageRating([...reviews, newReview]); 
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>

      {/* Displaying average rating */}
      <AverageRating rating={averageRating} />

      {/* Form for adding new reviews */}
      <ReviewForm setReviews={handleNewReview} calculateAverageRating={calculateAverageRating} />

      {/* Displaying the list of reviews */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {/* Button to return to the main page */}
      <Link to="/" className="back-button">
        <i className="fas fa-arrow-left"></i> Back to main page
      </Link>
    </div>
  );
}

export default UserProfile;
