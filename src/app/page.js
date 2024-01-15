'use client'

import { useState, useEffect } from 'react';
import axios from '../axios';
import NavbarComponent from '../components/NavbarComponent';
import Meal from '../components/Meal'; // Import the new component
import { Container, Row, Button, Modal, Form, Navbar } from 'react-bootstrap';

const HomePage = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the review modal
  const [showModal, setShowModal] = useState(false);
  const [mealId, setMealId] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // State for login and signup modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [user, setUser] = useState(null);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State for the select menu

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value.slice(0, 8)); // Limit password to 8 characters
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // alert(accessToken)
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (accessToken) {
      // alert(currentUser.name)
      setUser(currentUser)
      setLoggedIn(true);
      // Fetch user details if needed
    }
    const fetchMeals = async () => {
      try {
        const response = await axios.get('/latest-meals');
        setMeals(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/signup', {
        name,
        "email": username,
        password,
        role
      });
      setUser(response.data.user); // Store user information
      setLoggedIn(true);
      setShowSignupModal(false);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      // Handle signup errors
      alert(error)
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        password,//: 'boratevinod',
        username//: 'borate@tti.com'
      });
      setUser(response.data.user);
      setLoggedIn(true);
      setShowLoginModal(false);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      // Handle login errors
      alert(error.message)
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null); // Clear user state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user'); // Assuming you're storing user data in local storage
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/reviews/${mealId}`, {
        reviewer: {
          email: user.email, // Replace with actual reviewer email
          name: user.name // Replace with actual reviewer name
        },
        rating,
        review
      });
      // Update meals data
      const newReview = response.data; // Assuming response.data contains the submitted review
      setMeals(
        meals.map((meal) =>
          meal.id === mealId
            ? {
              ...meal,
              reviews: [...meal.reviews, newReview], // Push new review to the reviews array
            }
            : meal
        )
      );
      setShowModal(false);
    } catch (error) {
      // Handle submission errors
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <>
      <NavbarComponent
      loggedIn={loggedIn}
      user={user}
      onLoginClick={() => setShowLoginModal(true)}
      onSignupClick={() => setShowSignupModal(true)}
      handleLogout={handleLogout}
    />
    <main>
      {isLoading ? (
        <p>Loading meals...</p>
      ) : error ? (
        <p>Error fetching meals: {error.code}</p>
      ) : (
          <Container>
            <Row>
              <h1 className="text-center">Meals</h1>
            </Row>
            <Row className="justify-content-center">
            
                  {meals.map((meal, index) => (
                    <Meal
                      key={index}
                      meal={meal}
                      loggedIn={loggedIn}
                      onReviewClick={() => {
                        setShowModal(true);
                        setMealId(meal.id);
                      }}
                    />
                  ))}
            </Row>
          </Container>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="rating">
  <Form.Label>Star Rating:</Form.Label>
  <Form.Control
    type="number"
    value={rating}
    onChange={(e) => {
      const newValue = Math.max(0, Math.min(5, parseInt(e.target.value, 10))); // Clamp value between 0 and 5
      setRating(newValue);
    }}
  />
</Form.Group>
          <Form.Group controlId="review">
              <Form.Label>Review:</Form.Label>
              <Form.Control as="textarea" rows={3} value={review} onChange={(e) => setReview(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary"
            onClick={(event) => handleReviewSubmit(event)}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={username}
                onChange={handleUsernameChange} />
            </Form.Group>
            <Form.Group
              controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Cancel
          </Button>
          <Button variant="primary"
            onClick={(event) => handleLogin(event)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add form fields for signup data here */}
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" value={name}
                onChange={handleNameChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={username}
                onChange={handleUsernameChange} />
            </Form.Group>
            <Form.Group
              controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange} />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role:</Form.Label>
              <Form.Select value={role} onChange={handleRoleChange}>
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignupModal(false)}>
            Cancel
          </Button>
          <Button variant="primary"
            onClick={(event) => handleSignup(event)}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
    </>
  );
};

export default HomePage;