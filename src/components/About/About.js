import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import TradingViewWidget from "../TradingWidget/TradingViewWidgetMini";

function About() {
  return (
    <Container fluid className="about-section">
      
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
