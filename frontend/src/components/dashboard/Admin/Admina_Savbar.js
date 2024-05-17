import React from 'react';
import './style.css';

const Sidebar = () => {
  const AdminProfile = () => {
    window.location.href = '/admin/onlyprofile';
  };
  
  const AdminPannel = () => {
    window.location.href = '/admin/adminpannel';
  };
  
  const SellerSection = () => {
    window.location.href = '/admin/createseller';
  };
  
  const ShowStockMedicine = () => {
    window.location.href = '/admin/showstockmedicine';
  };
  
  const DeliveryWorker = () => {
    window.location.href = '/admin/deliveryworker';
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/'; 
  };
  
  const ClientOrders = () => {
    window.location.href = '/admin/order';
  };
  
  const Home = () => {
    window.location.href = '/admin_dashboard';
  };
  
  const UserFeedback = () => {
    window.location.href = '/admin/feedback';
  };

  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="bx bxl-c-plus-plus"></i>
        <span className="logo_name">Bits Pharmacy</span>
      </div>
      <ul className="nav-links myadmin">
        <li>
          <button className="active  back" onClick={Home}>
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Home</span>
          </button>
        </li>
        <li>
          <button className="active back" onClick={ShowStockMedicine}>
            <i className="bx bx-box"></i>
            <span className="links_name">Stock Medicine</span>
          </button>
        </li>
        <li>
          <button className="active back" onClick={ClientOrders}>
            <i className="bx bx-list-ul"></i>
            <span className="links_name">Order list</span>
          </button>
        </li>
        <li>
          <button className="active  back" onClick={SellerSection}>
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="links_name">Medicine Buy</span>
          </button>
        </li>
        <li>
          <button className="active back" onClick={UserFeedback}>
            <i className="bx bx-coin-stack"></i>
            <span className="links_name">Feedback</span>
          </button>
        </li>
        <li>
          <button className="active back" onClick={DeliveryWorker}>
            <i className="bx bx-book-alt"></i>
            <span className="links_name">Delivery Worker</span>
          </button>
        </li>
     
        <li>
          <button className="active back" onClick={AdminPannel}>
            <i className="bx bx-message"></i>
            <span className="links_name">AdminPannel</span>
          </button>
        </li>
        <li className="log_out active" onClick={handleLogout}>
          <button className='back'>
            <i className="bx bx-log-out"></i>
            <span className="links_name ">Log out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
