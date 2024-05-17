import React from 'react';
import { Link } from 'react-router-dom';
import AdminList from './Showadmin';
// import './Navbar.css'; // Import your custom CSS for styling
import Navbar from '../Admina_Savbar';
import './admin.css';
const Navbar1 = () => {
  return (
    <div className='scroll-admincss'>
    <Navbar/>
<div >

   
    <div className="navbar">
      <Link to="/admin/see-all" className="navbar-link">
        See All Admins
      </Link>
      <Link to="/admin/create" className="navbar-link">
        Create Admin
      </Link>
    </div>

    
    <AdminList />
   

    </div>
    </div>


  );
};

export default Navbar1;
