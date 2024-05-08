import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "antd";
import Navbar from '../User_Navbar';
import './UserMedicine.css'; 

const UserStockMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const [ProductPrice, setPrice] = useState(null);
  const [Noofproducts, setNoofproducts] = useState(null);
  const[Productname, setProductname] = useState(null);
  const [productId, setProductId] = useState(null);
  const addToCartHandler = async (medicine) => {
   

   
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
   
    try {
        
        await axios.post("http://localhost:5000/api/cart/add-to-cart", {
           
        Productname: medicine.medicineName,
        Productprice: medicine.adminmedicineprice,
        Noofproducts: 1,

        
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product added to cart successfully!");
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    
  };

  useEffect(() => {
    const fetchUserStockMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medicine/getallstockmedicine');
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching stock medicines:', error);
        setError('Failed to fetch stock medicines. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStockMedicines();
  }, []);

  return (
    <div>
    <Navbar/>
    <div >
      <div className='medicine-list' >
        {medicines.map((medicine) => (
          <div key={medicine._id} className='card'>
         
            <h3>Medicine Name: {medicine.medicineName}</h3>
           
            <p>Quantity: {medicine.adminmedicinequantity}</p>
          
            
            <h3>Price: {medicine.adminmedicineprice}</h3>
            
            <p>Category: {medicine.medicinecategory}</p>
            <p>Expiry Date: {medicine.expiryDate}</p>
            <p>Manufacturing Date: {medicine.manufacturingDate}</p>
            <p>Made In: {medicine.madeIn}</p>
            <p>No of Tablets: {medicine.nooftablets}</p>
            <br />
            <Button type="primary" onClick={()=>addToCartHandler(medicine)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}

     
    </div></div>
  );
};

export default UserStockMedicine;
