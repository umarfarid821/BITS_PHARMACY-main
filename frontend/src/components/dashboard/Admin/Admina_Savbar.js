import React from 'react';
import { useState } from 'react';
import { Navbar, Container, Nav, Button,Form } from 'react-bootstrap';
 
const Sidebar = () => {

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




  const AdminProfile = () => {
    window.location.href = '/admin/onlyprofile';
  };
  
  const AdminPannel = () => {
    window.location.href = '/admin/adminpannel';
  };
  
  const SellerSection = () => {
    window.location.href = '/admin/createseller';
  };
  
  const ShowStockMedicine = () => {
    window.location.href = '/admin/showstockmedicine';
  };
  
  const DeliveryWorker = () => {
    window.location.href = '/admin/deliveryworker';
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/'; 
  };
  
  const ClientOrders = () => {
    window.location.href = '/admin/order';
  };
  
  const Home = () => {
    window.location.href = '/admin_dashboard';
  };
  
  const UserFeedback = () => {
    window.location.href = '/admin/feedback';
  };

  return (
    <Navbar bg="danger" data-bs-theme="dark">
    <Button variant="danger" 
         className={`nav-item ${isActive ? 'my-active' : ''}`}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave} onClick={Home}>Bits Pharmacy</Button>
    
      <Container>
       
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto bg-danger  ">
         
            
         <Button variant="danger" 
         className={`nav-item ${isActive ? 'my-active' : ''}`}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave} onClick={Home}>Home</Button>

          <Button variant="danger"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={ShowStockMedicine}>Medicine Stock</Button>

          <Button variant="danger"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={ClientOrders}>User Orders</Button>
          <Button variant="danger"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={UserFeedback}>User Feedback</Button>
    
          <Button variant="danger"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={AdminPannel}>Admins Information</Button>
          
          <Button variant="danger"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={DeliveryWorker}>Delivery Workers</Button>

          <Button variant="danger"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={SellerSection}>Seller Section</Button>

          
          
          <Button variant="danger"
          className={`nav-item ${isActive ? 'my-active' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave} onClick={handleLogout}>Logout</Button>


         

         
        
        </ul>
        
        
       
      </div>
      
      </Container>
    </Navbar>
  );
}

export default Sidebar;
