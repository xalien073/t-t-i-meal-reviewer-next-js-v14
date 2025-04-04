'use client'


import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import axios from '../axios';
import NavbarComponent from '../components/NavbarComponent';
import Meal from '../components/Meal';
import FooterComponent from '../components/FooterComponent';
import { Container, Row, Col, Button, Modal, Form, Navbar } from 'react-bootstrap';

function HomePage() {
  const errorRef = useRef(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ShowError, setShowError] = useState(false);
  const [Error, setReqError] = useState(false);

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
  const [role, setRole] = useState('student');
  const [hideIdentity, setHideIdentity] = useState(false);

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

  const handleHideIdentityChange = () => {
    setHideIdentity(!hideIdentity);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // alert(accessToken)
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (accessToken) {
      setUser(currentUser);
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
    setShowError(false);
    // Validate password length before making API call
    if (password.length < 8) {
      setShowError(true);
      setReqError('Password must be at least 8 characters long.');
      errorRef.current?.focus(); // Focus on error message if it exists
      return; // Prevent unnecessary API call
    }
    // Prevent button clicks while submission is in progress
    const button = document.querySelector('#signUp');
    button.disabled = true;
    try {
      const response = await axios.post('/signup', {
        name,
        "email": username,
        password,
        role,
        "hideIdentity": hideIdentity
      });
      setUser(response.data.user);
      setLoggedIn(true);
      setShowSignupModal(false);
      setName('');
      setUsername('');
      setPassword('');
      setRole('student');
      setHideIdentity(false);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      // Handle signup errors
      setShowError(true);
      setReqError(error.response.data.detail);
      errorRef.current?.focus();
    }
    button.disabled = false;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setShowError(false);
    const button = document.querySelector('#logIn');
    button.disabled = true;
    try {
      const response = await axios.post('/login', {
        password,
        username
      });
      setUser(response.data.user);
      setLoggedIn(true);
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      // Handle login errors
      setShowError(true);
      setReqError(error.response.data.detail);
      errorRef.current?.focus();
    }
    button.disabled = false;
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null); // Clear user state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user'); // Assuming you're storing user data in local storage
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    if (review == '') {
      setShowError(true);
      setReqError('Review cannot be empty.');
      errorRef.current?.focus(); // Focus on error message if it exists
      return; // Prevent unnecessary API call
    }
    const button = document.querySelector('#review');
    button.disabled = true;
    try {
      const response = await axios.post(`/reviews/${mealId}`, {
        reviewer: {
          email: user.email,
          name: user.name,
          hideIdentity: user.hideIdentity
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
      setRating(0);
      setReview('');
    } catch (error) {
      // Handle submission errors
      setShowError(true);
      setReqError(error.response.data.detail);
      errorRef.current?.focus();
    }
    button.disabled = false;
  };

  return (
    <>
      <NavbarComponent
        loggedIn={loggedIn}
        user={user}
        onLoginClick={() => {
          setShowLoginModal(true);
          setShowError(false);
        }}
        onSignupClick={() => {
          setShowSignupModal(true);
          setShowError(false);
        }}
        handleLogout={handleLogout}
      />
      <main id='main' style={{ minHeight: '100vh' }}>
        <h1>
          Testing ingress behavior!
        </h1>
        {isLoading ? (
          <p className='text-center'>Loading meals...</p>
        ) : error ? (
          <p className='text-center'>Error fetching meals: {error.code}</p>
        ) : (
          <Container>
            <Row>
              <h1 className="text-center">
                Meals served in T T I of P B M A
              </h1>
            </Row>
            <Row>
              <Col xs={0} lg={2} className="hidden-md-down">
              </Col>
              <Col xs={12} lg={8}>
                {meals.map((meal, index) => (
                  <Meal
                    user={user}
                    key={index}
                    meal={meal}
                    loggedIn={loggedIn}
                    onReviewClick={() => {
                      setShowModal(true);
                      setMealId(meal.id);
                      setShowError(false)
                    }}
                    onLoginClick={() => setShowLoginModal(true)}
                  />
                ))}

              </Col>
              <Col xs={0} lg={2} className="hidden-md-down">
              </Col>
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
            <Button id='review' variant="primary"
              onClick={(event) => handleReviewSubmit(event)}>
              Submit Review
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
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
            <p ref={errorRef}
              aria-live="assertive" aria-atomic="true">
              {ShowError && ( // Conditionally render the error message if it exists
                <>
                  {/* This empty span is required for focus management */}
                  <span aria-hidden="true"></span>
                  {Error}
                </>
              )}
            </p>
            <Button id='logIn' variant="primary"
              onClick={(event) => handleLogin(event)}>
              Log In
            </Button>
            <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="hideIdentity">
                <Form.Check
                  type="checkbox"
                  label="Hide identity while reviewing"
                  checked={hideIdentity}
                  onChange={handleHideIdentityChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <p ref={errorRef}
              aria-live="assertive" aria-atomic="true">
              {ShowError && ( // Conditionally render the error message if it exists
                <>
                  {/* This empty span is required for focus management */}
                  <span aria-hidden="true"></span>
                  {Error}
                </>
              )}
            </p>
            <Button id='signUp' variant="primary" type='submit'
              onClick={(event) => handleSignup(event)}>
              Sign Up
            </Button>
            <Button variant="secondary" onClick={() => setShowSignupModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

      </main>

      <FooterComponent />
    </>
  );
};

export default HomePage;