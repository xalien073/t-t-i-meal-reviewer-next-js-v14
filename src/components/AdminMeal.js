import { Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminMeal = ({ loggedIn, meal, onEditClick, onLoginClick }) => {
    const averageRating = meal.reviews.reduce((sum, review) => sum + review.rating, 0) / meal.reviews.length;

    return (
        <Card>
            <Card.Body>
                <h2>
                    {meal.name}
                    < /h2>
                    < Card.Text > Meal type: {meal.meal_type} </Card.Text>
                    < Card.Text > Date served: {meal.current_date} </Card.Text>
                    < Card.Text > Day served: {meal.current_day}
                    </Card.Text>
                    < h3 > Reviews < /h3>
                        {
                            meal.reviews.length > 0 && !isNaN(averageRating) ? (
                                <Card.Text>
                                    Average Rating: {averageRating.toFixed(1)}
                                    <FontAwesomeIcon icon={faStar} /> stars
                                    < /Card.Text>
                                    ) : (
                                    <Card.Text>No reviews yet < /Card.Text>
         )}
                                        <ListGroup variant="flush" >
                                            {
                                                meal.reviews.map((review, reviewIndex) => (
                                                    <ListGroupItem key={reviewIndex} >
                                                        <Card.Text>
                                                            {review.reviewer.name} rated {review.rating} < FontAwesomeIcon icon={faStar} /> stars
                                                            < /Card.Text>
                                                            <Card.Text>
                                                                Review: {review.review}
                                                                < /Card.Text>
                                                                < /ListGroupItem>
                                                                ))
}
                                                                < /ListGroup>
                                                                < /Card.Body>
                                                                <Card.Footer>
                                                                    {
                                                                        loggedIn ? (
                                                                            <Button variant="primary" size="lg"
                                                                                onClick={onEditClick} >
                                                                                Edit < FontAwesomeIcon icon={faPlus} />
                                                                            </Button>
                                                                        ) : (
                                                                            <Button variant="primary" size="lg"
                                                                                onClick={onLoginClick} >
                                                                                Log In to edit < FontAwesomeIcon icon={faUser} />
                                                                            </Button>
                                                                        )
                                                                    }
                                                                </Card.Footer>
                                                            </Card>
                                                            );
};

                                                            export default AdminMeal;
