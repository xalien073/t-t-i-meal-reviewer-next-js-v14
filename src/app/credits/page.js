'use client'

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import FooterComponent from '../../components/FooterComponent';

export default function CreditsPage() {
  return (
    <>
    <main className="bg-dark" style={{ minHeight: '100vh' }}>
      <Head>
        <title>Credits</title>
      </Head>
    <Container>
      <Row className="justify-content-center">
      <Link className="text-white px-3" href="/">
              <h2 className="text-center text-white">
                Home <FontAwesomeIcon icon={faHome} />
              </h2>
          </Link>
        <Col xs={12}>
          <Image src="/Kohler.jpeg"
          alt="Kohler Logo" 
          width={10000}
          height={200}
          className="w-100"
          />
        </Col>
        <Col xs={12}>
          <h1 className="text-center text-white">Credits</h1>
            <h3 className="text-center text-white">
            Name: Shreshtha Gupta
            </h3>
<p className="text-center text-white">Title : Lead - Azure at Kohler</p>
<p className="text-center text-white">Department : Web Development</p>
            <h3 className="text-center text-white">
            Name: Pramod Javelekar
            </h3>
            <p className="text-center text-white">
              Pursuing Web Accessiblity at T T I
              </p>
            <h3 className="text-center text-white">
            Name: Vaibhav Dhadve - 
              </h3>
              <p className="text-center text-white">Title: Technical Consultant at ReBIT</p>
              <p className="text-center text-white">Department : Development</p>
        </Col>
      </Row>
    </Container>
    {/* <FooterComponent /> */}
    </main>
    <FooterComponent />
    </>
  );
}
