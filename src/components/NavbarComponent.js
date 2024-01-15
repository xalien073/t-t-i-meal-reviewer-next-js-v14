import Link from 'next/link';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavbarComponent({ loggedIn, user, onLoginClick, onSignupClick, handleLogout }) {

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
      <Link href="/">
      <Navbar.Brand className="text-white">
        TTI Meal Reviewer
        </Navbar.Brand>
    </Link>
    <Link className="text-white px-3" href="/credits">
              Credits
          </Link>
        <Nav className="ms-auto d-flex">
          {loggedIn ? ( 
            <div className="ms-auto d-flex">
              <span className="text-white mx-2">
                {user.name}
              </span>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="ms-auto d-flex">
              <Button variant="primary" onClick={onSignupClick}>
                Sign Up
              </Button>
              <Button variant="primary" onClick={onLoginClick} className="mx-2">
                Login
              </Button>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
