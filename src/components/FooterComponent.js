import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

export default function FooterComponent() {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <Container>
        <p className="text-muted text-center text-white mt-5">&copy; 2024 T T I Meal Reviewer</p>
      </Container>
    </footer>
  );
};
