const express = require('express');
const app = express();

app.use(express.json());

let reviews = [
  { text: 'Example review 1', rating: 5 },
  { text: 'Example review 2', rating: 4 }
];

app.delete('/api/reviews', (req, res) => {
  const { text } = req.body;  
  console.log('Deleting review with text:', text);  

  const reviewIndex = reviews.findIndex(review => review.text === text);

  if (reviewIndex !== -1) {
    reviews.splice(reviewIndex, 1); 
    return res.status(204).send();  
  } else {
    return res.status(404).json({ message: 'Review not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
