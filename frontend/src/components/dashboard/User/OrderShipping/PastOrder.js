import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../User_Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Container fluid style={{ height: '720px', overflowY: 'auto' , paddingBottom: '20px'  }}  className="bg-light">
      <Navbar />
      <Container>
        <h2 className="my-4">Past Orders</h2>
        {orders.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {orders.map((order, idx) => (
              <Col key={idx}>
                <div className="p-3 border rounded">
                  <h4>Order {idx + 1}</h4>
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <p><strong>Order Status:</strong> {order.OrderStatus}</p>
                  <p><strong>Order By:</strong> {order.shippingAddress.name}</p>
                  <p><strong>Shipping Address:</strong> {order.shippingAddress.address}</p>
                  <p><strong>City:</strong> {order.shippingAddress.city}</p>
                  <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <ul>
                    {order.cartItems.map((item, itemIdx) => (
                      <li key={itemIdx} className="mb-2">
                        <p>
                          <strong>Product:</strong> {item.Productname} <br />
                          <strong>Price:</strong> ${item.Productprice} <br />
                          <strong>Quantity:</strong> {item.Noofproducts}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default PastOrders;
