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
    <div className="seller-details-container overflow-scroll-seller">
  <Navbar />
  
 
  <div className="row">
    <div className="col-md-6  d-sel">
      <h1>Seller Details For {seller.name}</h1>
      <div className="seller-info">
        <p className='custom-seller '><strong>Name:</strong> {seller.name}</p>
        <p className='custom-seller'><strong>Email:</strong> {seller.email}</p>
        <p className='custom-seller'><strong>Phone Number:</strong> {seller.phoneNumber}</p>
        <p className='custom-seller'><strong>Address:</strong> {seller.address}</p>
        <p className='custom-seller'><strong>City:</strong> {seller.city}</p>
        <p className='custom-seller'><strong>Username:</strong> {seller.username}</p>
      </div>
    </div>

   
    <div className="col-md-6  my-bg">
      <h1 className='sellerh'>Create Seller</h1>
      <div className="seller-products-form">
        <SellerProductsForm sellerName={seller.name} />
      </div>
    </div>
  </div>
</div>


  );
};

export default SellerDetails;
