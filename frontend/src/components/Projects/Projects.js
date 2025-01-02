import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import galaxyPlanner from "../../Assets/Projects/galaxy-planner.png";
import regret from "../../Assets/Projects/regret.png";
import sykochat from "../../Assets/Projects/sykochat.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="red">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sykochat}
              title="Chat With SykoNaught AI"
              description="Welcome to my domain, mortal. I’m SykoNaught, your sarcastic, all-knowing crypto overlord. Ask your pathetic questions, and I’ll try not to laugh too hard at your feeble attempts to keep up."
              internalLink={true}
              demoLink="/projects/sykochat"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={regret}
              title="Crypto Regret Calculator"
              description="Plug in the crypto you chickened out on, the date you wimped out, and the cash you didn't spend. Watch in agony as it shows you just how rich you could have been, if only you had the balls back then."
              internalLink={true}
              demoLink="/projects/crypto-regret?c=BTC&d=1295568000&f=3000"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={galaxyPlanner}
              title="Galaxy Planner"
              description="Calculator for the online mobile game Infinite Galaxy. It assists with the calculation of resource packs within your depot, and compares that total to the amount that is required for a given upgrade."
              demoLink="https://galaxyplanner.com/"
            />
          </Col>
        </Row>
      </Container>
      <Particle />
    </Container>
  );
}

export default Projects;
