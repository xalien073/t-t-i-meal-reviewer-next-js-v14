import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';

export default function CreditsPage() {
  return (
    <main className="bg-dark">
      <Head>
        <title>Credits</title>
      </Head>
    <Container>
      <Row className="justify-content-center">
      <Link className="text-white px-3" href="/">
              <h1 className="text-center">Home</h1>
          </Link>
        <Col xs={12}>
          <Image src="/Kohler.jpeg"
          alt="Kohler Logo" 
          width={500}
          height={200}
          className="w-100"
          />
        </Col>
        <Col xs={12}>
          <h2 className="text-center text-white">Credits</h2>
            <h3 className="text-center text-white">
            Name: Shreshtha Gupta
            </h3>
<p className="text-center text-white">Title : Lead - Azure</p>
<p className="text-center text-white">Department : Web Development</p>
            <h3 className="text-center text-white">
            Name: Pramod Javelekar
            </h3>
            <p className="text-center text-white">Pursuing Web Accessiblity at TTI</p>
            <h3 className="text-center text-white">
            Name: Vaibhav Dhadve - 
              </h3>
              <p className="text-center text-white">Title: Technical Consultant at RBI I T</p>
        </Col>
      </Row>
    </Container>
    </main>
  );
}
