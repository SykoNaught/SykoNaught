import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src="/images/logo.png" className="img-fluid logo" alt="brand" />
          &nbsp;SykoNaught
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Link className="nav-link" href="/" passHref>
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" href="/about" passHref>
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" href="/projects" passHref>
                  <AiOutlineFundProjectionScreen
                    style={{ marginBottom: "2px" }}
                  />{" "}
                  Projects
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;