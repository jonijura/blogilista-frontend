import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = ({ handleLogout, user }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mr-auto">
        <Nav.Link href="#" as="span">
          <Link to="/">blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/users">users</Link>
        </Nav.Link>
      </Nav>
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <Navbar.Text>{user.name}</Navbar.Text>
          <Nav.Link href="#" as="span">
            <Link to="/" onClick={handleLogout}>
              logout
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
