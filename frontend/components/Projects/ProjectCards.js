import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp;
            {"GitHub"}
          </Button>
          )}

          {props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target={props.internalLink ? "_self" : "_blank"}
              style={props.ghLink ? { marginLeft: "10px" } : {}}
            >
              <CgWebsite /> &nbsp;
              
              {"Check It out"}
            </Button>
          )}
      </Card.Footer>
    </Card>
  );
}
export default ProjectCards;
