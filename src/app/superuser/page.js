'use client'

import { useState, useEffect } from 'react';
import axios from '../../axios';
import AdminMeal from '../../components/AdminMeal';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHandshakeAngle, faQuestion } from '@fortawesome/free-solid-svg-icons';

function AdminPage() {
  const [meals, setMeals] = useState([]);
  const [emails, setEmails] = useState([]);
  const [isMealsLoading, setIsMealsLoading] = useState(true);
  const [mealsError, setMealsError] = useState(null);
  const [isEmailsLoading, setIsEmailsLoading] = useState(true);
  const [emailsError, setEmailsError] = useState(null);

  // State for the review modal
  const [showModal, setShowModal] = useState(false);
  const [mealId, setMealId] = useState('');
  const [mealName, setMealName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // State for login and signup modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State for the select menu
  const [newEmail, setNewEmail] = useState('');

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

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  useEffect(() => {
    const adminAccessToken = localStorage.getItem('adminAccessToken');
    // alert(accessToken)
    const currentUser = JSON.parse(localStorage.getItem('adminUser'))
    if (adminAccessToken) {
      // alert(currentUser.name)
      setAdminUser(currentUser)
      setLoggedIn(true);
    }
    const fetchMeals = async () => {
      try {
        const response = await axios.get('/latest-meals');
        setMeals(response.data);
      } catch (error) {
        setMealsError(error);
      } finally {
        setIsMealsLoading(false);
      }
    };

    const fetchEmails = async () => {
      try {
        const response = await axios.get('/users');
        setEmails(response.data);
      } catch (error) {
        setEmailsError(error);
      } finally {
        setIsEmailsLoading(false);
      }
    };

    fetchMeals();
    fetchEmails();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin-signup', {
        name,
        "email": username,
        password,
      });
      setAdminUser(response.data.user); // Store user information
      setLoggedIn(true);
      setShowSignupModal(false);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      localStorage.setItem('adminAccessToken', response.data.accessToken);
    } catch (error) {
      // Handle signup errors
      alert(error)
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin-login', {
        password,
        username
      });
      setAdminUser(response.data.user);
      setLoggedIn(true);
      setShowLoginModal(false);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      localStorage.setItem('adminAccessToken', response.data.accessToken);
    } catch (error) {
      // Handle login errors
      alert(error.message)
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAdminUser(null); // Clear user state
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminUser');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/meals/${mealId}`, {}, {
        params: {
          mealName, // Include mealName as a query parameter
        },
      });
      // Update meals data
      const updatedMeal = response.data;
      setMeals(
        meals.map((meal) =>
          meal.id === mealId ? updatedMeal : meal
        )
      );
      setShowModal(false);
    } catch (error) {
      // Handle submission errors
      alert(`${error.message} Failed to edit. Please try again.`);
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/associated-users', {
        "email": newEmail
      })
      alert('Email added successfully!')
      setShowEmailModal(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
  <>
    <main style={{ minHeight: '80vh' }}>
      <h1>
        Admin Panel
      </h1>
      {loggedIn ? (
        <div className="ms-auto d-flex">
          <span className="text-white mx-2">
            {adminUser.name}
            <FontAwesomeIcon icon={faUser} />
          </span>
          <Button variant="primary" onClick={() => setShowEmailModal(true)} className="mx-2">
            Add New Email
          </Button>
          <Button variant="danger" onClick={handleLogout}>Log Out</Button>
        </div>
      ) : (
        <div className="ms-auto d-flex">
          <Button variant="primary" onClick={() => setShowSignupModal(true)}>
            Sign Up
          </Button>
          <Button variant="primary" onClick={() => setShowLoginModal(true)} className="mx-2">
            Log In
          </Button>
        </div>
      )}
      {isMealsLoading ? (
        <p className='text-center'>Loading meals...</p>
      ) : mealsError ? (
        <p className='text-center'>Error fetching meals: {mealsError.code}</p>
      ) : (
        <Container>
          <h2>
            Meals
          </h2>
          <Row>
            <Col xs={0} lg={2} className="hidden-md-down">
            </Col>
            <Col xs={12} lg={8}>
              {meals.map((meal, index) => (
                <AdminMeal
                  key={index}
                  meal={meal}
                  loggedIn={loggedIn}
                  onEditClick={() => {
                    setShowModal(true);
                    setMealId(meal.id);
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
      {isEmailsLoading ? (
        <p className='text-center'>Loading emails...</p>
      ) : emailsError ? (
        <p className='text-center'>Error fetching emails: {emailsError.code}</p>
      ) : (
        <Container>
          <h2>
            Registered Users:
          </h2>
            {emails.map((email, index) => (
            <h3 key={index}>
                {index+1}.{email.email}
            </h3>
            ))}
            </Container>
          )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit meal name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h1>
              {mealId}
            </h1>
            <Form.Group controlId="mealName">
              <Form.Label>Meal name:</Form.Label>
              <Form.Control as="textarea" rows={3} value={mealName} onChange={(e) => setMealName(e.target.value)} />
            </Form.Group>
            -            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"
            onClick={(event) => handleUpdate(event)}>
            Edit
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
          <Button variant="primary"
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"
            onClick={(event) => handleSignup(event)}>
            Sign Up
          </Button>
          <Button variant="secondary" onClick={() => setShowSignupModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newEmail">
              <Form.Label>New Email:</Form.Label>
              <Form.Control type="email" value={newEmail}
                onChange={handleNewEmailChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"
            onClick={(event) => handleAddEmail(event)}>
            Add Email
          </Button>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  </>
);
};

export default AdminPage;