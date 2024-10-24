import axios from 'axios';

const api = axios.create({
  baseURL: 'GET http://localhost:3000/reviews/1', 
});

export const getReviews = async (userId) => {
  const response = await api.get(`/reviews/user/${userId}`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  await api.delete(`/reviews/${reviewId}`);
};

export default api;
