import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import galaxyPlanner from "../../Assets/Projects/galaxy-planner.png";
import editor from "../../Assets/Projects/chatify.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
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
              imgPath={galaxyPlanner}
              title="Galaxy Planner"
              description="Calculator for the online mobile game Infinite Galaxy. It assists with the calculation of resource packs within your depot, and compares that total to the amount that is required for a given upgrade."
              demoLink="https://galaxyplanner.com/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
