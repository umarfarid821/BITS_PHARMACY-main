import React from 'react';
import './admin.css'; // Import the external CSS file
// import Profile from './Profile/profile';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  
  const SellerSection = () => {
    // Define the function to handle the "Profile" button click
    window.location.href = '/admin/showseller';
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
  const handleLogout = () => {
    // Handle logout logic here, such as clearing authentication token and redirecting to landing page
    localStorage.removeItem('adminToken');
    window.location.href = '/'; // Replace with the actual route for your landing page
  };
  return (
    <div className="navbar">
      
      <button onClick={() => scrollToSection('about')}>About</button>
      <button onClick={handleLogout}>Logout</button>
     
    </div>
  );
};

export default NavBar;
