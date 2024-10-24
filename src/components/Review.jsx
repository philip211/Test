import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Review({ review }) {
  return (
    <div>
      <p>{review.text}</p>
      <p>Rating: {review.rating} stars</p>
    </div>
  );
}

export default Review;
