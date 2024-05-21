import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
const DashboardScreen = () => {
     // State to hold the total data
     const [totalData, setTotalData] = useState(null);
     const [totalData2, setTotalData2] = useState(null);
     const [totalData3, setTotalData3] = useState(null);
     const [totalData4, setTotalData4] = useState(null);
     // State to hold loading status
     const [loading, setLoading] = useState(true);
     // State to hold error status
     const [error, setError] = useState(null);
     const AdminProfile = () => {
      // Define the function to handle the "Profile" button click
      window.location.href = '/admin/profile';
    }
     useEffect(() => {
        // Function to fetch data from backend API
        const fetchTotalData = async () => {
            const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    //decode token 
    console.log(config);


            try {
                // Make GET request to fetch total data
                const response = await axios.get('http://localhost:5000/api/dashboard/gettotal', config);
                const response2 = await axios.get('http://localhost:5000/api/dashboard/getrecentorders', config);
                const response3 = await axios.get('http://localhost:5000/api/dashboard/get5productsales', config);
                const response4 = await axios.get('http://localhost:5000/api/dashboard/getProfile', config);
                console.log(response4);
                // Update totalData state with fetched data
                setTotalData(response.data);
                setTotalData2(response2.data);
                setTotalData3(response3.data);
                setTotalData4(response4.data);
                
                // Set loading to false
                setLoading(false);
            } catch (error) {
                // Handle error
                console.error('Error fetching total data:', error);
                // Update error state
                setError('Failed to fetch total data');
                // Set loading to false
                setLoading(false);
            }
        };

        // Call fetchTotalData function
        fetchTotalData();
    }, []); // Empty dependency array means this effect will only run once, equivalent to componentDidMount()

    // If loading, display loading message
    if (loading) return <div>Loading...</div>;

    // If error, display error message
    if (error) return <div>Error: {error}</div>;

    // If totalData is null or empty, display no data message
    if (!totalData) return <div>No data available</div>;

  return (
    <section className="home-section">
      <nav>
        <div className="sidebar-button">
          <i className="bx bx-menu sidebarBtn"></i>
          <span className="dashboard">Welcome {totalData4.username} </span>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <i className="bx bx-search"></i>
        </div>
        <div className="profile-details">
          <img src="./profile.jpg" alt="" />
          <span className="admin_name" onClick={AdminProfile}>{totalData4.username}</span>
          <i className="bx bx-chevron-down"></i>
        </div>
      </nav>

      <div className="home-content">
        <div className="overview-boxes">
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Order</div>
              <div className="number">{totalData.totalOrders}</div>
              <div className="indicator">
                <i className="bx bx-up-arrow-alt"></i>
                <span className="text">All Orders</span>
              </div>
            </div>
            <i className="bx bx-cart-alt cart"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Today Orders</div>
              <div className="number">{totalData.todayOrders}</div>
              <div className="indicator">
                <i className="bx bx-up-arrow-alt"></i>
                <span className="text">Today Orders</span>
              </div>
            </div>
            <i className="bx bxs-cart-add cart two"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Yesterday Orders</div>
              <div className="number">{totalData.totalYesterdayOrders}</div>
              <div className="indicator">
                <i className="bx bx-up-arrow-alt"></i>
                <span className="text">Up from yesterday</span>
              </div>
            </div>
            <i className="bx bx-cart cart three"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Sales</div>
              <div className="number">{totalData.totalSales}Rs</div>
              <div className="indicator">
                <i className="bx bx-down-arrow-alt down"></i>
                <span className="text">All Sales Income</span>
              </div>
            </div>
            <i className="bx bxs-cart-download cart four"></i>
          </div>
        </div>

        <div className="sales-boxes">
          <div className="recent-sales box">
            <div className="title">Recent Sales</div>
            <div className="order-list">
        <div className="sales-details">
          <ul className="details">
            <li className="topic">Date</li>
            {totalData2.map(order => (
              <li key={order._id}><a href="#">{new Date(order.createdAt).toLocaleDateString()}</a></li>
            ))}
          </ul>
          <ul className="details">
            <li className="topic">Customer</li>
            {totalData2.map(order => (
              <li key={order._id}><a href="#">{order.shippingAddress.name}</a></li>
            ))}
          </ul>
          <ul className="details">
            <li className="topic">Sales</li>
            {totalData2.map(order => (
              <li key={order._id}><a href="#">{order.OrderStatus}</a></li>
            ))}
          </ul>
          <ul className="details">
            <li className="topic">Total</li>
            {totalData2.map(order => (
              <li key={order._id}><a href="#">${order.totalAmount.toFixed(2)}</a></li>
            ))}
          </ul>
        </div>
      </div>
            <div className="button">
              <a href="#">See All</a>
            </div>
          </div>
          <div className="top-sales box">
            <div className="title">Top Selling Product</div>
            <ul className="top-sales-details">
            {totalData3.top5ProductSales.map((order, index) => (
              <li key={index}>
                <a href="#">
                  {/* Replace the placeholders with actual images */}
                  
                  <span className="product">{order._id}</span>
                </a>
                <span className="price">{/* Replace with actual price if available */}</span>
                <span className="sales-count">{order.salesCount}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardScreen;
