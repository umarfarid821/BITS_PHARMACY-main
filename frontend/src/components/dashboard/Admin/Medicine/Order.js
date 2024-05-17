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
    const todayOrders= ordersToday.length;
    
    setTotalOrdersToday(todayOrders);

    // Calculate total orders for yesterday
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(); // 86400000 ms = 1 day
    const ordersYesterday = ordersData.filter(order => new Date(order.createdAt).toLocaleDateString() === yesterday);
    const totalOrdersYesterday = ordersYesterday.length;
    console.log(totalOrdersYesterday);
    setTotalOrdersYesterday(totalOrdersYesterday);
  
    const totalSales = ordersData.reduce((total, order) => total + order.totalAmount, 0);
    setTotalSales(totalSales);
    console.log('total',totalSales);
    // Send orders data to backend for calculation
    sendOrdersDataToBackend(totalOrders, todayOrders, totalOrdersYesterday,totalSales);
  };

  const sendOrdersDataToBackend = async (totalOrders, todayOrders,totalYesterdayOrders,totalSales) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
console.log(totalOrders,todayOrders,totalOrdersYesterday);
    try { 
        await axios.post('http://localhost:5000/api/dashboard/total', { totalOrders,todayOrders,totalYesterdayOrders,totalSales }, config);
    } catch (error) {
        console.error('Error sending orders data to backend:', error);
    }
    try {
      await axios.put('http://localhost:5000/api/dashboard/updatetotal', { totalOrders,todayOrders,totalYesterdayOrders,totalSales}, config);
  } catch (error) {
      console.error('Error updating orders data in backend:', error);
  }

};
  return (
   <div className="card-container bg-secondary">
   <NavBar/>
 
   <div className='order-list-container'>
   <div  className='row  '>
     <p className='p-style'>Total Orders: {totalOrders}</p>
     <p className='p-style' >Total Orders Today: {totalOrdersToday}</p>
     <p className='p-style'>Total Orders Yesterday: {totalOrdersYesterday}</p>
     <p className='p-style'>Total Sales: ${totalSales}</p>
   </div>
   
  
  
 
   <div className="container bg-primary card-my-style mt-2">
   <div className="row">
     {orders.map((order, index) => (
       <div key={order._id} className="col-md-4">
         <div className="card" style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
           <div className="list-group list-group-flush">
             <div className="list-group-item">
               <p>Order No: {index + 1}</p> {/* Adding order number */}
               <p>Order ID: {order._id}</p>
               <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
               <p>Order Status: {order.OrderStatus}</p>
             </div>
             <div>
               {order.shippingAddress && (
                 <p>
                   
                   Name: {order.shippingAddress.name},
                   Address: {order.shippingAddress.address},
                   City: {order.shippingAddress.city},
                   State: {order.shippingAddress.state}
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
               <p >Total Amount: ${order.totalAmount}</p>
             </div>
           </div>
         </div>
       </div>
     ))}
   </div>
 </div>
 
    

  
 </div>
 
   </div>
  );
}

export default Card;
