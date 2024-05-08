// Import necessary modules and components

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './sellerNavbar';
import SellerProductsForm from './sellerProduct';
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
    <div className="seller-details-container">
      <Navbar />
      <h1>Seller Details</h1>
      <div className="seller-info">
        <p className='Name'><strong>Name:</strong> {seller.name}</p>
        <p className='Email'><strong>Email:</strong> {seller.email}</p>
        <p className='PN'><strong>Phone Number:</strong> {seller.phoneNumber}</p>
        <p className='AD'><strong>Address:</strong> {seller.address}</p>
        <p className='CT'><strong>City:</strong> {seller.city}</p>
        <p className='UN'><strong>Username:</strong> {seller.username}</p>


        <div className="seller-products-form">
    
        <SellerProductsForm sellerName={seller.name} />
        
       
      </div>
      </div>

      
      <div>
    
      </div>
     
    </div>
  );
};

export default SellerDetails;
