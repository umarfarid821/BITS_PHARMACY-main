import React from 'react';
import './admin.css'; // Import the external CSS file


const NavBar = () => {
  const AdminProfile = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin/profile';
  };
  const AdminPannel = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin/adminpannel';
  };
  const SellerSection = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin/createseller';
  };
  const ShowStockMedicine = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin/showstockmedicine';
  }

  const handleLogout = () => {
    // Handle logout logic here, such as clearing authentication token and redirecting to landing page
    localStorage.removeItem('adminToken');
    window.location.href = '/'; // Replace with the actual route for your landing page
  };
  const ClientOrders = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin/order';
  };
  const Home = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin_dashboard';
  };
  const scrollToSection = (sectionId) => {
    // Define the function to handle scrolling to a section
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="navbar">
    <NavLink exact to="/" className="nav-logo">
            <span>CodeBucks</span>
            {/* <i className="fas fa-code"></i> */}
            <span className="icon">
              <CodeIcon />
            </span>
          </NavLink>
      <button onClick={Home}>Home</button>
      <button onClick={AdminProfile}>Profile</button>
      <button onClick={() => scrollToSection('about')}>About</button>
      <button onClick={SellerSection}>Seller</button>
      <button onClick={ClientOrders}>Client Orders</button>
      <button onClick={ShowStockMedicine}>Medicines Stock</button>
      <button onClick={() => scrollToSection('create-admins')}>User Feedback</button>
      <button onClick={AdminPannel} >Admins</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => scrollToSection('see-delivery-workers')}>Delivery Workers</button>
    </div>
  );
};

export default NavBar;
