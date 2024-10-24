export const calculateAverageRating = (reviews) => {
    const totalStars = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length ? (totalStars / reviews.length).toFixed(1) : 0;
  };
  