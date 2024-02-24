'use client'

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import FooterComponent from '../../components/FooterComponent';

export default function RoleOfAzure() {
    return (
        <>
            <main className="bg-dark" style={{ minHeight: '100vh' }}>
                <Head>
                    <title>
                        Role of Azure
                    </title>
                </Head>
                <Container>
                    <Row>
                        <Link className="text-white px-3" href="/">
                            <h2 className="text-center text-white">
                                Home <FontAwesomeIcon icon={faHome} />
                            </h2>
                        </Link>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h1 className="text-center text-white">
                                Here is a breakdown of the Azure services we are leveraging:
                            </h1>
                        </Col>
                        <Col md={6}>
                            <Image src="/azure.svg"
                                alt="Azure Logo"
                                width={400}
                                height={200}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6}>
                            <h5 className="card-title text-white">
                                Azure Functions App
                            </h5>
                            <p className="card-text text-white">
                                Hosting our backend API built with FastAPI, providing serverless
                                compute for event-driven functions.
                            </p>
                            <hr></hr>
                        </Col>
                        <Col sm={12} md={6}>
                            <h5 className="card-title text-white">
                                Azure Web App
                            </h5>
                            <p className="card-text text-white">
                                Hosting our frontend Next.js application, delivering a scalable and
                                performant web experience.
                            </p>
                            <hr></hr>
                        </Col>
                        <Col md={3}></Col>
                        <Col sm={12} md={6}>
                            <h5 className="card-title text-white">
                                Azure Cosmos DB for MongoDB
                            </h5>
                            <p className="card-text text-white">
                                Storing and managing our MongoDB data globally with low latency and
                                high availability.
                            </p>
                            <hr></hr>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                    <Row>
                    <h2 className="text-center text-white">
                                Future Plans:
                            </h2>
  <Col sm={12} md={6}>
    <h5 className="card-title text-white">Automate Meal Uploading Flow</h5>
    <p className="card-text text-white">
      Utilize Azure Functions App with a timer trigger to automate meal data upload at specific times or intervals. Streamline meal data management without manual intervention.
    </p>
    <hr />
  </Col>
  <Col sm={12} md={6}>
    <h5 className="card-title text-white">Simple Chat Application using Azure Queue Storage</h5>
    <p className="card-text text-white">
      Build a lightweight yet responsive chat application powered by Azure Queue Storage. Messages are sent and received asynchronously, ensuring smooth, scalable communication.
    </p>
    <hr />
  </Col>
  </Row>
                </Container>
            </main>
            <FooterComponent />
        </>
    );
}
