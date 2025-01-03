import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {AiFillGithub } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="4" className="footer-copyright">
            <h3>Designed and Developed by <span className="red">  &nbsp;SykoNaught</span></h3>
          </Col>
          <Col md="4" className="footer-copyright">
            <h3>© {year} SykoNaught.com</h3>
          </Col>
          <Col md="4" className="footer-body">
            <ul className="footer-icons">
              <li className="social-icons">
                <a
                  href="https://github.com/sykonaught"
                  style={{ color: "#f0f0f0" }}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/Sykonaught_X"
                  style={{ color: "#f0f0f0" }}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <BsTwitterX />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
