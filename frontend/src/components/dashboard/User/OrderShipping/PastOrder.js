import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../User_Navbar';
import './PastOrder.css'; // Import your CSS file
import { Link } from 'react-router-dom'; 
const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPastOrders();
  }, []);

  const fetchPastOrders = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      
      const response = await axios.get('http://localhost:5000/api/order/UserOrder', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching past orders:', error);
    }
  };

  if (loading) {
    return <div>Loading past orders...</div>;
  }

  return (
   
    <div className="past-orders-container">
        
      <Navbar />
      <h2>Past Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <div className="order-details">
              <p className="order-date">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
             
              <p>Order Status: {order.OrderStatus} </p>
                <p className="shipping-address">
                  Shipping Address: {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p className="payment-method">Payment Method: {order.paymentMethod}</p>
                <ul className="item-list">
                  {order.cartItems.map((item) => (
                    <li key={item._id} className="item">
                      <p>
                        Product: {item.Productname} <br />
                        Price: ${item.Productprice} <br />
                        Quantity: {item.Noofproducts}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastOrders;
