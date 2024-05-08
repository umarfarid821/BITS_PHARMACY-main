import React from 'react';
import './UserNavbar.css'; // Import the external CSS file


const NavBar = () => {
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
  }
  const handleLogout = () => {
    // Handle logout logic here, such as clearing authentication token and redirecting to landing page
    localStorage.removeItem('UserToken');
    window.location.href = '/'; // Replace with the actual route for your landing page
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
      
      <button onClick={()=>UserStockMedicine()}>Medicines</button>
      
      <button onClick={() => handleCartDisplay() }>Cart Display </button>
      
      <button onClick={UserFeedback}>User Feedback</button>
      
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => scrollToSection('see-delivery-workers')}>Delivery Workers</button>
    </div>
  );
};

export default NavBar;
