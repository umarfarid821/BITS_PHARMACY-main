import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../User_Navbar';
import { Row, Col, Card } from 'react-bootstrap'; // Import Card, Row, Col from react-bootstrap
import './PastOrder.css'; // Import your CSS file

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
      <div style={{ height: '1000px', overflowY: 'auto' }} >
      <h2>Past Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <Row xs={1} md={2} className="g-4  ">
          {orders.map((order, idx) => (
            <Col key={idx}  lg={3}  >
              <Card    >
                <Card.Body >
                  <Card.Title>Order {idx + 1}</Card.Title>
                  <Card.Text>
                    <p className="order-date">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                    <p  class="card-header" >Order Status: {order.OrderStatus}</p>
                    <p className="shipping-address">Order By : {order.shippingAddress.name}</p>
                    <p className="shipping-address">Shipping Address: {order.shippingAddress.address}</p>
                    <p className="shipping-address">City: {order.shippingAddress.city}</p>
                    <p className="shipping-address">Postal Code: {order.shippingAddress.postalCode}</p>

                    <p className="payment-method">Payment Method: {order.paymentMethod}</p>

                    <ul className="item-list">
                      {order.cartItems.map((item, idx) => (
                        <li key={idx} className="item">
                          <p>
                            Product: {item.Productname} <br />
                            Price: ${item.Productprice} <br />
                            Quantity: {item.Noofproducts}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
      </div>
    </div>
  );
};

export default PastOrders;
