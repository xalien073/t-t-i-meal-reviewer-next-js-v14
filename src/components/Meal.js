import { useState, useEffect } from 'react';
import { Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

const Meal = ({ user, loggedIn, meal, onReviewClick, onLoginClick }) => {
  const averageRating = meal.reviews.reduce((sum, review) => sum + review.rating, 0) / meal.reviews.length;
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    // Update userHasReviewed state based on user and meal updates
    const reviewerEmails = meal.reviews.map((review) => review.reviewer.email);
    setUserHasReviewed(reviewerEmails.includes(user?.email)); // Handle null user gracefully
  }, [user, meal]);
  
  return (
    <Card>
      <Card.Body>
          <h2>
          {meal.name}
          </h2>
        <Card.Text>Meal type: {meal.meal_type}</Card.Text>
        <Card.Text>Date served: {meal.current_date}</Card.Text>
        <Card.Text>Day served: {meal.current_day}
        </Card.Text>
        <h3>Reviews</h3>
        {meal.reviews.length > 0 && !isNaN(averageRating) ? (
        <Card.Text>
          Average Rating: {averageRating.toFixed(1)} 
          <FontAwesomeIcon icon={faStar} /> stars
        </Card.Text>
         ) : ( 
          <Card.Text>No reviews yet</Card.Text>
         )} 
        <ListGroup variant="flush">
          {meal.reviews.map((review, reviewIndex) => (
            <ListGroupItem key={reviewIndex}>
              <Card.Text>
              {review.reviewer.hideIdentity ? '*****' : review.reviewer.name} rated {review.rating}
              </Card.Text>
              <Card.Text>
                Review: {review.review}
              </Card.Text>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        {/* Show "Add Review" button only if logged in and hasn't reviewed yet */}
        {loggedIn && !userHasReviewed && (
          <Button variant="primary" size="lg" onClick={onReviewClick}>
            Add Review <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
        {/* Otherwise, show "Log In to add review" button */}
        {!loggedIn ? (
          <Button variant="primary" size="lg" onClick={onLoginClick}>
            Log In to add review <FontAwesomeIcon icon={faUser} />
          </Button>
        ) : null}
        </Card.Footer>
        <hr></hr>
    </Card>
  );
};

export default Meal;
