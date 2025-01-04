import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../components/Particle";
import Techstack from "../components/About/Techstack";
import Aboutcard from "../components/About/AboutCard";
import TradingViewWidget from "../components/TradingWidget/TradingViewWidgetMini";
import Head from "next/head";

function About() {
  return (
    <Container fluid className="about-section">
      <Head>
      <title>About | SykoNaught.com</title>
        <meta name="description" content="The God King of the internet realm" />

        <meta itemprop="name" content="Know My Name | SykoNaught.com"/>
        <meta itemprop="description" content="Get to know a little bit About The God King of the internet realm"/>
        <meta itemprop="image"
            content=""/>

        <meta property="og:url" content="https://sykonaught.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Know My Name | SykoNaught.com"/>
        <meta property="og:description" content="Get to know a little bit About The God King of the internet realm"/>
        <meta property="og:image"
            content=""/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Know My Name | SykoNaught.com"/>
        <meta name="twitter:description" content="Get to know a little bit About The God King of the internet realm"/>
        <meta name="twitter:image"
            content=""/>
      </Head>
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            className="interior-content"
            style={{
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know My <strong className="red">Name</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            className="interior-content"
          >
            <TradingViewWidget />
          </Col>
        </Row>
        <div style={{paddingTop:"2rem"}}>
          <h1 className="project-heading">
            Professional <strong className="red">Skillset </strong>
          </h1>

          <Techstack />
        </div>
        
      </Container>
      <Particle />
    </Container>
  );
}

export default About;
