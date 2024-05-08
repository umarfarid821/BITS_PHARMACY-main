import React from 'react';
import './admin.css'; // Import the external CSS file

import Navbar from './sellerNavbar';
const LandingPage = () => {
  return (
    <div>
    <div className="content">
      <h1>Welcome to the Seller Dashboard</h1>
      <p>This is the landing page of the seller dashboard.</p>
    </div>
    <Navbar/>
    
    </div>
   

    
    
  );
};

export default LandingPage;
