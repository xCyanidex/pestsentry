import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png"

const AppNavbar = () => {
const navigate=useNavigate();
const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(logout()); 
  navigate("/");  
}
  return (
    <>
      <Navbar  expand="lg" className="bg-body-tertiary mb-8">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              alt="Logo"
              width="75" // Adjust width for your logo
              className="d-inline-block align-top"
              style={{ maxWidth: "100%" }} // Ensures logo is responsive
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/records">All Records</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};


export default AppNavbar;