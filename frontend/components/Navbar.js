import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineRead
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
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex">
          <Image src="/images/logo.png" width={50} height={28} className="img-fluid logo" alt="brand" />
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
              <Link className="nav-link" href="/" onClick={() => updateExpanded(false)} passHref>
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" href="/crypto-news" onClick={() => updateExpanded(false)} passHref>
                  <AiOutlineRead style={{ marginBottom: "2px" }} /> Crypto News
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" href="/about" onClick={() => updateExpanded(false)} passHref>
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" href="/projects" onClick={() => updateExpanded(false)} passHref>
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