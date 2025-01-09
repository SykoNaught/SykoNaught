import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../components/Particle";
import Type from "../components/Home/Type";
import Image from "next/image";
import Head from "next/head";

function Home() {
  return (
    <section>
      <Head>
        <title>Home | SykoNaught.com</title>
        <meta name="description" content="The God King of the internet realm" />

        <meta itemprop="name" content="Home | SykoNaught.com"/>
        <meta itemprop="description" content="The God King of the internet realm"/>
        <meta itemprop="image"
            content=""/>

        <meta property="og:url" content="https://sykonaught.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Home | SykoNaught.com"/>
        <meta property="og:description" content="The God King of the internet realm"/>
        <meta property="og:image"
            content=""/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Home | SykoNaught.com"/>
        <meta name="twitter:description" content="The God King of the internet realm"/>
        <meta name="twitter:image"
            content=""/>
      </Head>
      <Container fluid className="home-section" id="home">
        
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hello Mortal...{" "}
              </h1>

              <h1 className="heading-name">
                I'm <strong className="main-name red">SykoNaught</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
                <Button variant="primary"style={{marginTop: "80px"}} href="/projects/sykochat">Chat With Me...</Button>
              </div>
              <div className="shameless-begging">
                
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20, textAlign: "center" }}>
              <Image
                src={"/images/SykoFace.png"}
                alt="home pic"
                width={377}
                height={485}
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
        
      </Container>
      <Particle />
    </section>
  );
}

export default Home;
