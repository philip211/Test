import React, { useState } from 'react';
import axios from 'axios';
import './ReviewsPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const submitReviewAPI = async (newReview) => {
  const response = await axios.post('http://localhost:3000/reviews', newReview);
  return response.data;
};


const calculateAverageRating = (reviews) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return 0;
  }

  
  const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);


  return (totalRating / reviews.length).toFixed(1);  
};

function ReviewForm({ reviews, setReviews, setAverageRating }) {
  const [text, setText] = useState('');
  const [stars, setStars] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    if (text.trim() === '') {
      setErrorMessage('Review cannot be empty.');
      return false;
    }
    return true;
  };

  const submitReview = async (e) => {
    e.preventDefault();

   
    setErrorMessage('');
    setSuccessMessage('');

    
    if (!validateForm()) {
      return;
    }

    const newReview = { text, rating: stars };

    try {
      const submittedReview = await submitReviewAPI(newReview);

      
      const updatedReviews = Array.isArray(reviews) ? [...reviews, submittedReview] : [submittedReview];

      
      setReviews(updatedReviews);

      
      const newAverageRating = calculateAverageRating(updatedReviews);
      setAverageRating(newAverageRating);  

      
      setText('');
      setStars(1);
      setSuccessMessage('Your review has been successfully submitted!');
    } catch (error) {
      setErrorMessage('An error occurred while submitting the review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={submitReview} className="review-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review"
        required
      />
      <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <button type="submit" className="submit-button">
        <i className="fas fa-paper-plane"></i> Submit Review
      </button>

      {/* Display error and success messages */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}

function ReviewsPage() {
  const [reviews, setReviews] = useState([
    
    { text: 'Great service!', rating: 4 },
    { text: 'Very satisfied!', rating: 5 },
  ]);
  const [averageRating, setAverageRating] = useState(calculateAverageRating(reviews));

  return (
    <div className="reviews-page">
      <h1><i className="fas fa-user"></i> User Profile</h1>
      <h2><i className="fas fa-star"></i> Average Rating: {averageRating} Stars</h2>
      
      <ReviewForm 
        reviews={reviews} 
        setReviews={setReviews} 
        setAverageRating={setAverageRating} 
      />

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <p><i className="fas fa-star"></i> Rating: {review.rating} stars</p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
