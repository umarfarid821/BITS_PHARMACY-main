import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css'; // Import the CSS file
import NavBar from '../Admina_Savbar';
import DashboardScreen from '../dashboardscreen';

const Card = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalOrdersToday, setTotalOrdersToday] = useState(0);
  const [totalOrdersYesterday, setTotalOrdersYesterday] = useState(0);
  const [totalSales, setTotalSales] = useState(0); // State to hold total sales
  const [workers, setWorkers] = useState([]);
  const [workersNames, setWorkersNames] = useState('');
  const [name, setName] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    fetchOrders();
  }, []);

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/order/AdminOrder', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ordersData = response.data;
      setOrders(ordersData);
      calculateTotals(ordersData);

      // Loop through each order to fetch delivery worker data
      for (const order of ordersData) {
        const orderId = order._id;
        const getDeliveryWorkers = await axios.get(`http://localhost:5000/api/deliveryWorker/getbyorderid/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract username from delivery worker data and set it in state
        const username = getDeliveryWorkers.data.username;
        setName(username);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotals = (ordersData) => {
    // Calculate total orders
    const totalOrders = ordersData.length;
    setTotalOrders(totalOrders);

    // Calculate total orders for today
    const today = new Date().toLocaleDateString();
    const ordersToday = ordersData.filter(order => new Date(order.createdAt).toLocaleDateString() === today);
    const todayOrders = ordersToday.length;
    setTotalOrdersToday(todayOrders);

    // Calculate total orders for yesterday
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(); // 86400000 ms = 1 day
    const ordersYesterday = ordersData.filter(order => new Date(order.createdAt).toLocaleDateString() === yesterday);
    const totalOrdersYesterday = ordersYesterday.length;
    setTotalOrdersYesterday(totalOrdersYesterday);

    const totalSales = ordersData.reduce((total, order) => total + order.totalAmount, 0);
    setTotalSales(totalSales);

    // Send orders data to backend for calculation
    sendOrdersDataToBackend(totalOrders, todayOrders, totalOrdersYesterday, totalSales);
  };

  const sendOrdersDataToBackend = async (totalOrders, todayOrders, totalYesterdayOrders, totalSales) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post('http://localhost:5000/api/dashboard/total', { totalOrders, todayOrders, totalYesterdayOrders, totalSales }, config);
    } catch (error) {
      console.error('Error sending orders data to backend:', error);
    }
    try {
      await axios.put('http://localhost:5000/api/dashboard/updatetotal', { totalOrders, todayOrders, totalYesterdayOrders, totalSales }, config);
    } catch (error) {
      console.error('Error updating orders data in backend:', error);
    }
  };

  const handlefetchWorkers = async (orderId) => {
    try {
      const response = await axios.get('http://localhost:5000/api/deliveryWorker/getdeliveryworkers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const workersData = response.data;
      setWorkers(workersData);
      if (Array.isArray(workersData)) {
        const usernames = workersData.map(worker => worker.username);
        setWorkersNames(usernames); // Update state with the workers' names
      } else {
        console.error('Unexpected response format:', workersData);
        setWorkersNames([]);
      }
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleAssignOrder = async (orderId, username) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`http://localhost:5000/api/deliveryWorker/put/${orderId}/${username}`, {}, config);
    if (response.data) {
      alert('Order assigned successfully');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.shippingAddress && order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:5000/api/order/delete-order/${orderId}`, config);
      alert('Order deleted successfully');
    // refresh 
    window.location.reload();
    }
    catch (error) {
      console.error('Error deleting order:', error);
    }

  }

  return (
    <div className="container-fluid bg-light card-container-scroll">
      <NavBar />
      <div className="row">
        <div className="col-md-3">
          <div className="card-container bg-secondary">
            <div className='order-list-container'>
              <div className='row'>
                <p className='p-style'>Total Orders: {totalOrders}</p>
                <p className='p-style'>Total Orders Today: {totalOrdersToday}</p>
                <p className='p-style'>Total Orders Yesterday: {totalOrdersYesterday}</p>
                <p className='p-style'>Total Sales: ${totalSales}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9   ">
          <div className="card-container bg-primary card-my-style mt-2 d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  placeholder="Search by user name"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="form-control mb-3"
                />
              </div>
              {filteredOrders.length === 0 ? (
                <div className="col-12">
                  <div className="card1 text-center">
                    <div className="card-body">
                      <h5 className="card-title">No Orders</h5>
                      <p className="card-text">There are no orders to display at this time.</p>
                    </div>
                  </div>
                </div>
              ) : (
                filteredOrders.map((order, index) => (
                  <div key={order._id} className="col-md-6"> {/* Use col-md-6 for two columns */}
                    <div className="card1 mb-3" style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                      <div className="list-group list-group-flush">
                        <div className="list-group-item">
                          <p>Order No: {index + 1}</p>
                          <p>Order ID: {order._id}</p>
                          <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                          <p>Order Status: {order.OrderStatus}</p>
                          <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>Delete Order</button>
                        </div>
                        <div className='text-white'>
                          {order.shippingAddress && (
                            <p className='text-white text-center od'>
                              Name: {order.shippingAddress.name}
                              <br></br>
                              Address: {order.shippingAddress.address}
                              <br></br>
                              City: {order.shippingAddress.city}
                              <br></br>
                              State: {order.shippingAddress.state}
                              <br></br>
                              PostalCode: {order.shippingAddress.postalCode}
                            </p>
                          )}
                          <p>Payment Method: {order.paymentMethod}</p>
                          <div>
                            <p>Items:</p>
                            <ul>
                              {order.cartItems.map((item) => (
                                <li key={item._id}>
                                  {item.name} - Price: ${item.Productprice} - Quantity: {item.Noofproducts}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p>Total Amount: ${order.totalAmount}</p>
                        </div>
                        <p>Assigned Order To</p>
                        <div className="text-center">
                          <button className="btn btn-primary" onClick={() => handlefetchWorkers(order._id)}>Assign Order</button>
                          <div>
                            {workersNames.length > 0 ? (
                              <>
                                <h3>Workers Names</h3>
                                <ul>
                                  {workersNames.map((username, index) => (
                                    <li className='workername' key={index} onClick={() => handleAssignOrder(order._id, username)} style={{ cursor: 'pointer' }}>
                                      {username}
                                    </li>
                                  ))}
                                </ul>
                             
                                </>
                              ) : (
                                <p>No workers available</p>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
