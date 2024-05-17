// Import necessary modules and components

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../Admina_Savbar';

//import SellerProductsForm from './sellerProduct';
import './adminSeller.css'; // Import your CSS file

import AllMedicinesCart from './getmedicine';

const SellerDetails = () => {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/seller/asellers/${sellerId}`);
        setSeller(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seller data:', error);
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [sellerId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('Seller name:', seller.name);
  return (

    <div className='bg-dark cart-slide' >
        <NavBar />
        <div className="adminSellerpad container">
        <h1>Seller Details To Admin</h1>
      
       <div className='details-admin'>
       
       <table className="table mt-3">
       <tbody>
         <tr>
           <th>Username</th>
           <th>Email</th>
           <th>Phone Number</th>
           <th>Address</th>
           <th>Gender</th>
           <th>Actions</th>
         </tr>
         <tr>
           <td>{seller.username}</td>
           <td>{seller.email}</td>
           <td>{seller.phoneNumber}</td>
           <td>{seller.address}</td>
           <td>{seller.gender}</td>
           <td> {/* Actions column, you can add buttons or links here */}</td>
         </tr>
       </tbody>
     </table>
       </div>
      </div>

      <AllMedicinesCart sellerName={seller.name} />
      

       



    </div>
   
  );
};

export default SellerDetails;
