import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../User_Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Img from './images/p-6.jpg';
import './UserMedicine.css';
import Button from 'react-bootstrap/Button';
const UserStockMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [ProductPrice, setPrice] = useState(null);
  const [Noofproducts, setNoofproducts] = useState(null);
  const [Productname, setProductname] = useState(null);
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
      <Navbar />
      <div style={{ height: '800px', overflowY: 'auto' }}  >
        <Row xs={1} md={2} className="g-4  ">
          {medicines.map((medicine, idx) => (
            <Col key={idx}>
              <Card class="card text-white  mb-3"  >
                <Card.Img variant="top" src={Img} />
                <Card.Body className='bg-primary'> 
                <Card.Title class="card-header" > Name : {medicine.medicineName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Price: {medicine.adminmedicineprice}</Card.Subtitle>
                <Card.Text>Availbale Tablets : {medicine.adminmedicinequantity}</Card.Text>
                <Card.Text>Medicine Category: {medicine.medicinecategory}</Card.Text>
                <Card.Text>Medicine Expiry Date: {medicine.expiryDate}</Card.Text>
               

                <button onClick={() => addToCartHandler(medicine)}>Add to Cart</button>
              </Card.Body>
              </Card>

            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default UserStockMedicine;
