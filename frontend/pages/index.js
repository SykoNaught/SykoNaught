import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../components/Particle";
import Type from "../components/Home/Type";
import Image from "next/image";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hello Mortal...{" "}
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name red"> SykoNaught</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
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
   
    </section>
  );
}

export default Home;
