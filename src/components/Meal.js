import { Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap';

const Meal = ({ loggedIn, meal, onReviewClick }) => {
  const averageRating = meal.reviews.reduce((sum, review) => sum + review.rating, 0) / meal.reviews.length;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{meal.name}</Card.Title>
        <Card.Text>
          Meal type: {meal.meal_type}</Card.Text>
        <Card.Text>Date served: {meal.current_date}</Card.Text>
        <Card.Text>Day served: {meal.current_day}
        </Card.Text>
        <Card.Title>Reviews</Card.Title>
        {meal.reviews.length > 0 && !isNaN(averageRating) ? (
        <Card.Text>Average Rating: {averageRating.toFixed(1)} stars</Card.Text>
         ) : ( 
          <Card.Text>No reviews yet</Card.Text>
         )} 
        <ListGroup variant="flush">
          {meal.reviews.map((review, reviewIndex) => (
            <ListGroupItem key={reviewIndex}>
              <p>{review.reviewer.name} rated {review.rating} stars</p>
              <p>Review: {review.review}</p>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        {loggedIn ? (
          <Button variant="primary" onClick={onReviewClick}>
            Add Review
          </Button>
        ) : (
          <p>Log in to add a review</p>
        )}
      </Card.Footer>
    </Card>
  );
};

export default Meal;
