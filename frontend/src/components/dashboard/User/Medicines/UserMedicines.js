import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../User_Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Img from './images/p-6.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserMedicine.css';
import Footer from '../Footer';

const UserStockMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({ width: '17rem', height: '40rem' });

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Additional logic for handling search submit can be added here if needed
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='overflow-scroll-USerMedicine bg-light'>
      <Navbar />
      <form className="form-inline my-2 my-lg-0 d-flex justify-content-center align-items-center " onSubmit={handleSearchSubmit}>
      <input
        className="form-control mr-sm-2  mt-3 "
        type="search"
        placeholder="Search Medicine"
        aria-label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="btn btn-outline-success  btn-sm" type="submit">Search</button>
    </form>
      <div>
        <Row xs={1} md={4} className="g-3">
          {filteredMedicines.map((medicine, idx) => (
            <Col key={idx}>
              <div className="d-flex my-card">
                <div className="card bg-primary" style={{ width: dimensions.width, height: dimensions.height }}>
                  <img src={Img} className="card-img-top" alt="..." />
                  <div className="card-body bg-black">
                    <h5 className="card-title">Name : {medicine.medicineName}</h5>
                    <p className="card-text">Description Of Medicine</p>
                    <p className="card-text">Available Quantity : {medicine.adminmedicinequantity}</p>
                    <p className="card-text">Price : {medicine.adminmedicineprice}</p>
                    <p className='card-text'>Expiry Date : {medicine.expiryDate}</p>
                    <div className='pt-3 pt-md-5'>
                      <button onClick={() => addToCartHandler(medicine)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default UserStockMedicine;
