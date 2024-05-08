// Import necessary modules and components

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../Admina_Savbar';

//import SellerProductsForm from './sellerProduct';
import './SellerDetails.css'; // Import your CSS file

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

    <div>
        <NavBar />
        <div className="seller-details-container">
      
    <h1>Seller  Details</h1>
    <div className="seller-info">
      <p><strong>Name:</strong> {seller.name}</p>
      <p><strong>Email:</strong> {seller.email}</p>
      <p><strong>Phone Number:</strong> {seller.phoneNumber}</p>
      <p><strong>Address:</strong> {seller.address}</p>
      <p><strong>City:</strong> {seller.city}</p>
      <p><strong>Username:</strong> {seller.username}</p>
    </div>

    <div className="seller-products-form  ">
    <AllMedicinesCart sellerName={seller.name} />
     
    </div>
    <div>
  
    </div>
   
  </div>
    </div>
   
  );
};

export default SellerDetails;
