import React, { useState } from 'react';
import { Navbar, Container, Nav, Button,Form } from 'react-bootstrap';
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
  const UserProfile = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin/profile';
  };
  
  const UserStockMedicine = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/user/stockmedicines';
  };
  
  const handleCartDisplay = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/user/cart';
  };
  
  const UserFeedback = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/user/feedback';
  };
  const Home=()=>{
    window.location.href = '/user_dashboard';
     
  };
  const handleLogout = () => {
    // Handle logout logic here, such as clearing authentication token and redirecting to landing page
    localStorage.removeItem('UserToken');
    window.location.href = '/'; // Replace with the actual route for your landing page
  };
  const AboutPage=()=>{
    window.location.href = '/user/about';
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
    <Button variant="primary" 
         className={`nav-item ${isActive ? 'my-active' : ''}`}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave} onClick={Home}>Bits Pharmacy</Button>
    
      <Container>
       
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto bg-primary ">
         
            
         <Button variant="primary" 
         className={`nav-item ${isActive ? 'my-active' : ''}`}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave} onClick={Home}>Home</Button>

          <Button variant="primary"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={UserStockMedicine}>Shop</Button>

          <Button variant="primary"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={handleCartDisplay}>Cart</Button>
          <Button variant="primary"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={UserFeedback}>Contact</Button>
         
          <Button variant="primary"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={AboutPage}>About</Button>
          <Button variant="primary"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={handleLogout}>Logout</Button>


         

         
        
        </ul>
        
        
       
      </div>
      <Form className="d-flex my-form">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />

    </Form>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
