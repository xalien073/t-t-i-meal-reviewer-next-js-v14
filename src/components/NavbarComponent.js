import styles from '../app/page.module.css';
import Link from 'next/link';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHandshakeAngle, faQuestion } from '@fortawesome/free-solid-svg-icons';

function NavbarComponent({ loggedIn, user, onLoginClick, onSignupClick, handleLogout }) {

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
      <a href="#main" className={styles.skipToContent}>
        Skip to Main Content
      </a>
      <Link href="/">
      <Navbar.Brand className="text-white">
        TTI Meal Reviewer
        </Navbar.Brand>
    </Link>
    <Link className="text-white px-3" href="/role-of-azure">
              Role of Azure <FontAwesomeIcon icon={faQuestion} />
          </Link>
    <Link className="text-white px-3" href="/credits">
              Credits <FontAwesomeIcon icon={faHandshakeAngle} />
          </Link>
        <Nav className="ms-auto d-flex">
          {loggedIn ? ( 
            <div className="ms-auto d-flex">
              <span className="text-white mx-2">
                {user.name}
                <FontAwesomeIcon icon={faUser} />
                </span>
              <Button variant="danger" onClick={handleLogout}>Log Out</Button>
            </div>
          ) : (
            <div className="ms-auto d-flex">
              <Button variant="primary" onClick={onSignupClick}>
                Sign Up
              </Button>
              <Button variant="primary" onClick={onLoginClick} className="mx-2">
                Log In
              </Button>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
