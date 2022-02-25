import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useMenu } from '../../context/menuContext';
import './navBar.scss';

const NavBar = () =>{
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)
    const { logOut } = useMenu();

    return(
        <Navbar bg="dark"  variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Alkemy Challenge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          { (auth()) && (
            <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className="me-auto">
                    <Nav.Link onClick={(()=>navigate('/'))}>Home</Nav.Link>
                    <Nav.Link onClick={(()=>navigate('/search'))}>Search</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="logOutCustom" onClick={( () => logOut() )}>Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    )
}

export default NavBar;
