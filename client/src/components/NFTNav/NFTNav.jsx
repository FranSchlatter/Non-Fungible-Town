import { React, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/logo/logo.png";
import style from "./NFTNav.css";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Shoppingkart from "../Shoppingkart/Shoppingkart";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function NFTNav() {
  {
    /* Pim Pum Pam*/
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar className="brand-colorized-background-color" expand="lg">
      <Container fluid>
        <img
          alt=""
          src={logo}
          width="60"
          height="60"
          className="d-inline-block align-top"
        />{" "}
        <Navbar.Brand>
          <Navbar.Text className="navbar-company-name-header brand-colorized-text">
            Non Fungible Town
          </Navbar.Text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="brand-colorized-text" href="/home">
              Home
            </Nav.Link>
            <Nav.Link className="brand-colorized-text" href="/createNft">
              Create
            </Nav.Link>
          </Nav>
          <SearchBar />
          <Nav>
            <Nav.Link className="brand-colorized-text" href="/login">
              Log in
            </Nav.Link>
            <Nav.Link className="brand-colorized-text" href="/signup">
              Sign up
            </Nav.Link>
            {/* slide kart trigger*/}
            <button
              style={{
                backgroundColor: "black",
                color: "#D3448B",
                border: "none",
              }}
              onClick={handleShow}
            >
              {" "}
              <ShoppingCartIcon />
            </button>
            {/* slide kart*/}
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Shoppingkart />
              </Offcanvas.Body>
            </Offcanvas>
            {/* slide kart*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
