import React, { useState } from 'react';
import { Navbar, Container, Button, Form, ListGroup } from 'react-bootstrap';
import './UserNavbar.css';

const NavbarComponent = () => {

  const [isActive, setIsActive] = useState(false);
 

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  const handleLogout = () => {
    // Handle logout logic here, such as clearing authentication token and redirecting to landing page
    localStorage.removeItem('UserToken');
    window.location.href = '/'; // Replace with the actual route for your landing page
  };
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Button
        variant="primary"
        className={`nav-item ${isActive ? 'my-active' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigateTo('/user_dashboard')}
      >
        Bits Pharmacy
      </Button>
      <Container>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto bg-primary">
            <Button
              variant="primary"
              className={`nav-item ${isActive ? 'my-active' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigateTo('/user_dashboard')}
            >
              Home
            </Button>
            <Button
              variant="primary"
              className={`nav-item ${isActive ? 'my-active' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigateTo('/user/stockmedicines')}
            >
              Shop
            </Button>
            <Button
              variant="primary"
              className={`nav-item ${isActive ? 'my-active' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigateTo('/user/cart')}
            >
              Cart
            </Button>
            <Button
              variant="primary"
              className={`nav-item ${isActive ? 'my-active' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigateTo('/user/feedback')}
            >
              Contact
            </Button>
            <Button
              variant="primary"
              className={`nav-item ${isActive ? 'my-active' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigateTo('/user/about')}
            >
              About
            </Button>
            <Button
              variant="primary"
              className={`nav-item ${isActive ? 'my-active' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </ul>
        </div>
       
     
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
