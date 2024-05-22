import React from 'react';
import { Link } from 'react-router-dom';
import AdminList from './Showadmin';
import { Button } from 'react-bootstrap';
// import './Navbar.css'; // Import your custom CSS for styling
import Navbar from '../Admina_Savbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
const Navbar1 = () => {
  const handleAdminCreate = () => {
    // Define the function to handle the "Create Admin" button click
    window.location.href = '/admin/create';
  };
  return (
    <div className='scroll-admincss'>
    <Navbar/>
<div className='mt-3 '>

   
    
    <Button className='ml-5 btn-danger' onClick={handleAdminCreate} > Create Admin</Button>

    
    <AdminList />
   

    </div>
    </div>


  );
};

export default Navbar1;
